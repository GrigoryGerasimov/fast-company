const path = require("path");
const express = require("express");
const config = require("config");
const { mongoose } = require("mongoose");
const chalk = require("chalk");
const { initDB } = require("./db/initDB");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use("/api", routes);

const staticPath = path.resolve(__dirname, "client");

app.use("/", express.static(staticPath));

const indexPath = path.resolve(staticPath, "index.html");

app.get("*", (req, res) => {
    res.sendFile(indexPath);
});
const startServer = async () => {
    try {
        mongoose.connection.once("open", () => {
            initDB();
        });
        await mongoose.connect(config.get("mongoURI"));
    } catch (error) {
        console.log(chalk.redBright(`The following error occurred: ${error.message}`));
    }
};

startServer();

module.exports = app;
