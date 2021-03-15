$(function () {
    // 需求1 切换登录注册
    $('#toReg').on('click', () => {
        $('.regBox').show().siblings('.loginBox').hide()
    })
    $('#toLogin').on('click', () => {
        $('.regBox').hide().siblings('.loginBox').show()
    })

    // 需求2 使用layui 自定义表单验证
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (val) {
            if ($('.regBox input[name=password]').val() != val) return '密码不一致'
        }
    })

    // 需求3 用户注册
    $('#regForm').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: $('#regForm').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg(res.message);
                $('#regForm')[0].reset(); //清空form表单内容
                $('#toLogin').click(); //跳转回登录界面
            }
        })
    })

    // 需求4 用户登录
    $('#loginForm').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $('#loginForm').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg('用户名密码错误');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})