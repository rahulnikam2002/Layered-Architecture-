require("dotenv").config()


const congif = {
    port: process.env.PORT || 5000,

    mongodb: {
        uri: process.env.MONGODB_CONNECT_URI,
    },

    api: {
        prefix: "/api",
        version: 'v1'
    },


    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }
}

module.exports = congif