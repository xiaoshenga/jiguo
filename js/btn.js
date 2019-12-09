//按钮插件封装
$.fn.extend({
    back: function (option) {
        console.log('执行');
        var obj = {
            key: false,     //是否显示按钮
            offset: 'left', //靠左还是靠右
            jianju: 10,  //离中间内容的间距
            width: 1000,    //中间内容的宽度
            speed: 500,      //滚动到的顶部的事件
            num: 100,   //滚动条滚动多少距离按钮出现
        }
        var ops = $.extend(obj, option);    //把传的形参替换到初始化的值
        var $win = $(window);
        var _this = $(this);    //  保存当前点击的指针

        var opr = {          //功能对象
            setPosition: function () {     //求出left值
                var l;
                var dw = $win.width();
                var w = _this.width();
                if (ops.offset == 'right') {
                    l = (dw - ops.width) / 2 + ops.width + ops.jianju;
                } else if (ops.offset == 'left') {
                    l = (dw - ops.width) / 2 - w - ops.jianju;
                }
                return l;
            },
            click: function () {   //点击事件触发的
                $('html,body').animate({
                    scrollTop: 0,
                }, ops.speed)
            },
            init: function () {
                var l = this.setPosition();
                if (ops.key) {
                    _this.css({
                        display: 'block',
                    })
                } else {
                    _this.css({
                        display: 'none',
                    })
                }
                _this.css({
                    left: l + 'px',
                })
            }
        }
        opr.init();
        //窗口滚动条发生变化触发的事件
        $win.scroll(function () {
            ops.key = $(window).scrollTop() > ops.num ? true : false;
            opr.init();
        })
        //窗口大小发生变化触发的事件
        $(window).resize(function () {
            opr.init();

        })
        //滚动条到顶部
        _this.on('click', function () {
            opr.click();
        });
    }
})
