$(function () {
    var ul = $('.lunbo ul');
    //上一张
    $('.prev').on('click', function () {
        move();
    })
    //下一张
    $('.next').on('click', function () {
        ul.children().last().prependTo(ul); //把最后一张插入到别的第一张
        ul.css('left', -1000);   //应为把最后一张插入到ul的第一张，当前展示的就变成第二张，所以把left改成-1000，对应到当前第二张的left值
        ul.animate({
            left: 0,
        }, 800, function () {
            ul.stop(true, true);
        });
    })
    var itmer = setInterval(move, 2000);
    //上一张点击按钮执行的函数
    function move() {

        ul.animate({
            left: -1000,    //left移动
        }, 800, function () {   //动画执行完成狗执行的函数
            ul.append(ul.children().first());    //把第一张插入到ul的最后一张
            ul.css('left', 0);   //应为把第一张插入到最后一张后，当前展示的就变成第一张，所以得把left变成0
            ul.stop(true, true); //取消队列，避免多次点击造成糟糕的用户体验
        })
    }
    //鼠标移入清楚定时器
    ul.on('mouseover',function(){
        console.log('a');
       clearInterval(itmer);
    })
    //鼠标移出设置定时器
    ul.on('mouseout',function(){
        itmer = setInterval(move,2000);
    })
    //请求数据
    var index = 0;
    $('.more-btn').on('click', function () {
        $(this).removeClass('jz').addClass('wc');
        var _this = $(this);
        var url = location.origin;
        $.ajax({
            type: 'get',
            url: 'js/json.js',
            dataType: 'json',
            success: function (data) {
                var str = '';
                data[index].forEach(function (ele, index) {
                    str += ' <li>\
                                <img src="'+ ele.img + '" alt="" width="220" height="130" >\
                                <div class="info">\
                                    <p class="name">'+ ele.text + '</p>\
                                    <p class="fiex">\
                                        <span class="left">'+ ele.price + '</span>\
                                        <div class="right">\
                                            <span class="one">3</span>\
                                            <span class="two">3</span>\
                                        </div>\
                                    </p>\
                                </div>\
                            </li>';
                })
                $('.cool').append(str);
                index++;
                _this.removeClass('wc').addClass('jz');
                if (index == 4) {
                    _this.parent().html('<span>没有更多内容啦！！</span>');
                }
            },
        })
    })

    //调用返回顶部按钮插件
    $('#back').back({
        offset: 'right',
        jianju: 0
    });
    
    $('header .nav li a').click(function(){
        console.log($(this));
    })

    /*显示登陆还是注册页面 */
    block()
    function block(){
        let href = window.location.href.split('?')[1];
        if(href == 'login'){
            $('.zuce_login').css('display','block');
            $('.zuce_res').css('display','none');
        }else{
            $('.zuce_res').css('display','block');
            $('.zuce_login').css('display','none');
        }
    }
})

