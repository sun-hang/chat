const socket = io()
/**
 * 登陆事件绑定
 * @param {String} name 
 */
page.onLogin = (name) => {
    socket.emit('login', name);
}

/**
 * 发送消息时的事件
 * @param {String} from 
 * @param {String} to 
 * @param {*} msg 
 */
page.onSendMsg = (from, to, msg) => {
    socket.emit('msg', { from, to, msg });
    page.addMsg(from, to, msg)
    page.clearInput();
}
socket.on('login', (data) => {
    if (data) {
        page.intoPage();
        socket.emit('users', '')
    } else {
        alert('昵称不可用') 
    }
})

socket.on('users', arr => {
    console.log(arr)
    for (const item of arr) {
        page.addUser(item)
    }
})

socket.on('new msg', (res) => {
    page.addMsg(res.from, res.to, res.msg)
})

socket.on('userin', (data) => {
    page.addUser(data)
})

socket.on('userout', (data) => {
    page.removeUser(data);
})