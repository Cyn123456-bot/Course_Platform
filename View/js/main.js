$(function() {
    //登录页面板控制动画
    $('#login').on('click', function() {
        // alert(11);
        $('.login').slideDown();
    });
    $('.delete a').on('click', function() {
        $('.login').slideUp();
    });
    $('#register').on('click', function() {
        // alert(11);
        $('.register').slideDown();
    });
    $('.register .delete a').on('click', function() {
        $('.register').slideUp();
    });

    // 获取时间
    function GetTime() {
        var str = '\t';
        var time = new Date();
        var year = time.getUTCFullYear();
        var month = time.getMonth();
        var day = time.getDay();
        var hour = time.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minutes = time.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var second = time.getSeconds();
        second = second < 10 ? '0' + second : second;
        str += year + '年' + month + '月' + day + '日' + '\t' + hour + ':' + minutes + ':' + second;
        $('#nowtime').text(str);
    }
    setInterval(GetTime, 1000); //每隔一秒执行一次获取时间的函数
    GetTime();

    //控制左侧导航栏
    var flag = 0;
    $('#control-left-nav').on('click', function() {
        if (flag == 0) {
            $('.left-nav').css('display', 'none');
            $('.content').removeClass('col-lg-10 col-md-10 col-sm-10');
            $('.content').addClass('col-lg-12 col-md-12 col-sm-12');
            flag = 1;
        } else {
            $('.left-nav').css('display', 'block');
            $('.content').removeClass('col-lg-12 col-md-12 col-sm-12');
            $('.content').addClass('col-lg-10 col-md-10 col-sm-10');
            flag = 0;
        }
    });

    //Tab菜单栏
    function changeTab(btn = [], box = []) {
        for (var i = 0; i < btn.length; i++) {
            // 设置index属性
            btn[i].setAttribute('index', i);
            btn[i].onclick = function() {
                for (var i = 0; i < btn.length; i++) {
                    btn[i].className = '';
                }
                this.className = 'current';
                // 获取index属性值
                var index = this.getAttribute('index');
                for (var i = 0; i < box.length; i++) {
                    box[i].style.display = 'none';
                }
                box[index].style.display = 'block';
            }
        }
    }
    changeTab($('#courses-title span'), $('.item')); //课程首页调用tab切换方法
    changeTab($('#nav-bar span'), $('.item')); //视频播放页调用tab切换方法

    //管理员首页切换主题背景色

    //课程页控制课程大纲
    $('#jichu').on('click', function() {
        $('#dagang_jichu').css('display', 'block');
    });
    $('#tigao').on('click', function() {
        $('#dagang_tigao').css('display', 'block');
    });

});