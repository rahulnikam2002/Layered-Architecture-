const app = require('./app');
const config = require('./config');
const DatabaseConfig = require('./config/database');

const startServer = async () => {
    try {
        await DatabaseConfig.connect()

        app.listen(config.port, () => {
            console.log("SERVER started")
        })

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer()