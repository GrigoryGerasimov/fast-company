const http = require("http");
const express = require("express");
const config = require("config");
const { mongoose } = require("mongoose");
const chalk = require("chalk");
const { handleError } = require("./listening/handleError");
const { initDB } = require("./db/initDB");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();

switch (process.env.NODE_ENV) {
    case "production": {
        console.log(chalk.blue("Running on Prod"));
        break;
    }
    case "development": {
        console.log(chalk.red("Running on Dev"));
    }
}
const normalizePortWithoutPipe = port => {
    const portValue = typeof port !== "number" ? Number(port) : port;
    return !isNaN(portValue) && port > 0 ? portValue : false;
};
const PORT = normalizePortWithoutPipe(config.get("PORT")) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use("/api", routes);

const server = http.createServer(app);
const startServer = async () => {
    try {
        mongoose.connection.once("open", () => {
            initDB();
        });
        await mongoose.connect(config.get("mongoURI"));
        server.listen(PORT, () => {
            console.log(chalk.greenBright(`Server has started listening on port ${PORT}`));
        });
        server.on("error", handleError);
        server.on("listening", () => {
            console.log(chalk.magenta(`Is currently listening on ${server.address().port}`));
        });
    } catch (error) {
        console.log(chalk.redBright(`The following error occurred: ${error.message}`));
    }
};

startServer();
