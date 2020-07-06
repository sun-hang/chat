const socketIo = require('socket.io');
let userList = [];
module.exports = function (server) {

    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('有新的客户端连接')
        let user = null;

        socket.on('login', data => {
            let users = userList.filter(item =>
                item.user === data
            )
            if (users.length > 0 || data === '所有人') {
                socket.emit('login', false);
            } else {
                userList.push({ socket, user: data })
                socket.emit('login', true);
                user = data;
                socket.broadcast.emit('userin', user);
            }
        })

        socket.on('users', () => {
            // let users = userList.filter(item =>
            //     item.user !== user
            // )
            socket.emit('users', userList.map(item => item.user))
        })

        socket.on('msg', (result) => {
            if (result.to) {
                let us = userList.filter(item => item.user === result.to)
                if (us.length < 1) {
                    // 没找到
                }
                let u = us[0];
                u.socket.emit('new msg', result)
            } else {
                socket.broadcast.emit('new msg', result);
            }
        })
        socket.on('disconnecting', () => {
            userList = userList.filter(item => item.user !== user)
            console.log(userList)
            socket.broadcast.emit('userout', user);
        })
    })
}