const net = require('net');
// const queryString = require('querystring');
const server = net.createServer((socket) => {
    console.log('有新的客户端进行链接')
    socket.once('data', chunk => {
        // console.log(chunk.toString('utf-8'))/
        let str = chunk.toString('utf-8');
        str = str.split('\r\n');
        str.shift();
        str = str.map(item => {
            if (item.length > 1) {
                const index = item.indexOf(':');
                return [item.substr(0, index), item.substr(index + 1).trim()]
            }
        })
        str = str.filter((item) => item)
        str = Object.fromEntries(str)
        const crypto = require('crypto');
        const hash = crypto.createHash('sha1');
        hash.update(str['Sec-WebSocket-Key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
        const key = hash.digest('base64');
        socket.write(`HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${key}

`);
        socket.on('data', (chunk) => {
            console.log(chunk.toString('utf-8'))
            try {
                // socket.write(Buffer.from('你好啊'))
                // socket.write(Buffer.from('你好啊'))
            } catch (error) {
                console.log(error)
            }
        })
    })
})

server.listen(12306, 'localhost', () => {
    console.log('开始监听12306端口')
})