$(() => {
    // 需求1 获取用户数据 渲染页面
    getUserInfo();
})

// 封装一个全局函数: 发送ajax获取用户数据 渲染页面
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        success: (res) => {
            console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            let { nickname, username, user_pic } = res.data;
            let name = nickname || username
            $('.welcome').html('欢迎' + name);
            if (user_pic) console.log(1); $('.userImg').attr('src', user_pic)
        }
    })
}