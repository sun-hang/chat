/**
 * 0.进入函数 ok
 * 1.添加用户 ok
 * 2.添加提示消息 ok
 * 3.添加发送消息 ok
 * 4.获取当前对谁进行操作 ok
 * 5.清空文本框内容 ok
 * 6.删除用户 ok
 * 7.恢复原状 ok
 * 8.添加用户列表点击事件 ok
 * 9.返回对象（包含登录事件和发送消息事件）
 * 10.注册登录和发送消息事件
 */

window.page = (function () {
    const Ousers = $('.users');
    const Ologs = $('.logList');

    /**
     * 进入函数
     */
    function intoPage() {
        $('.move').hide();
        $('.wrapper').show();
        $('.bottom .my').text(this.me)
    }

    /**
     * 添加新用户
     * @param {string} username 
     */
    function addUser(username) {
        $('<li>').html(`${username}`).attr('user', username).appendTo(Ousers);
        const number = +$('.left .title span').text();
        $('.left .title span').html(number + 1);
        addLog(`<span class="user">${username}</span>进入聊天室`)
    }

    /**
     * 添加提示消息
     * @param {String} data 
     */
    function addLog(data) {
        $('<li>').addClass('log').html(data).appendTo(Ologs)
    }

    function addMsg(from, to, msg) {
        let li = $(`<li><span class="user">${from}</span><span class="gray">对</span><span class="user">${to ? to : '所有人'}</span><span class="gray">说：</span></li>`)
        let msgSpan = $(`<span>`).text(msg)
        li.append(msgSpan).appendTo(Ologs);
        $('.top').scrollTop($('.top').prop("scrollHeight"), 0);
    }
    /**
     * 获取当前操作用户
     */
    function getUser() {
        const text = $('.bottom .user').text()
        return text === '所有人' ? null : text
    }

    /**
     * 清空文本框
     */
    function clearInput() {
        $('.msg').val('');
    }

    /**
     * 用户退出
     * @param {String} username 
     */
    function removeUser(username) {
        const li = $(`li[user=${username}]`);
        if (li.length < 1) {
            return;
        }
        li.remove();
        const number = +$('.left .title span').text();
        $('.left .title span').html(number - 1);
        addLog(`<span class="user">${username}</span>退出聊天室`)
        const text = $('.bottom .user').text()
        if (username === text) {
            $('.bottom .user').html('所有人')
        }
    }

    /**
     * 初始化页面
     */
    function initPage() {
        Ousers.html(`<li class="all">所有人</li>`)
        Ologs.html(`<li class="log">欢迎进入峰的聊天室</li>`)
        $('.left .title span').text(0)
    }

    /**
     * 绑定用户列表点击事件
     */
    Ousers.click(function (e) {
        if (e.target.nodeName === 'LI') {
            let text = $(e.target).text();
            $('.bottom .user').text(text)
        }
    });

    return {
        me: null,
        intoPage,
        addUser,
        addLog,
        addMsg,
        getUser,
        clearInput,
        removeUser,
        initPage,
        onLogin: null,
        onSendMsg: null
    }
})()

$('.move .name').keydown(function (e) {
    if (e.key === 'Enter') {
        const txt = $(e.target).val();
        page.me = txt;
        page.onLogin && page.onLogin(txt);
    }
});
$('.wrapper .msg').keydown(function (e) {
    if (e.key === 'Enter') {
        const txt = $(e.target).val();
        page.onSendMsg && page.onSendMsg(page.me, page.getUser(), txt);
    }
});