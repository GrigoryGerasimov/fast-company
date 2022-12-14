const handleError = (port, error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCESS": {
            console.error(`Accessing ${port} requires adequate access rights`);
            process.exit(1);
            break;
        }
        case "EADDRINUSE": {
            console.error(`${port} is already in use`);
            process.exit(1);
            break;
        }
        default: throw error;
    }
};

module.exports = {
    handleError
};
