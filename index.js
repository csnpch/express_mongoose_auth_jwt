const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const env = require('./app/configs/env').server;
const PORT = env.port || 3000;

server.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
