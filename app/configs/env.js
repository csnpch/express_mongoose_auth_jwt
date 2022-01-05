require('dotenv').config();

const server = {
    port: process.env.SERVER_PORT || 3000,
    node_env: process.env.NODE_ENV || 'development'
}

const database = {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/crupApp",
}

const authentication = {
    token_key: process.env.TOKEN_KEY || 'tokenkey'
}


module.exports = {
    server,
    database,
    authentication
}