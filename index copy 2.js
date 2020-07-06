const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(path.join(__dirname, 'public')))
io.on('connection', (socket) => {
    console.log('有新的客户端连接')
    socket.on('msg', (data) => {
        console.log(data)
    })
    let n = 1;
    let timer = setInterval(() => {
        socket.emit('test', n++)
    }, 2000)
    socket.on('disconnect', () => {
        if (timer) {
            clearInterval(timer)
        }
    })
})
server.listen(5008, 'localhost', () => {
    console.log('监听端口5008')
})