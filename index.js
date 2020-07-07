const express = require('express');

const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
require('./socketIO')(server);
app.use(express.static(path.join(__dirname, 'public')))

server.listen(5008, () => {
    console.log('监听端口5008')
})