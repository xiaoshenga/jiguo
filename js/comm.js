init();
//判断当前地址栏，显示隐藏登录注册界面
function init() {
    console.log('a');
    let ref = location.href.split('?')[1];
    if(ref){
        ref = ref.split('=')[1];
        if ('login' == ref) {
            console.log('登录')
            $('.res').css('display', 'none');
            $('.login').css('display', 'block');
        } else if ('res' == ref) {
            console.log('注册');
            $('.res').css('display', 'block');
            $('.login').css('display', 'none');
        }
    }
}
login()
//登录
function login() {
    $('.loginBtn').click(async function (e) {
        console.log('denglu');
        e.preventDefault();
        let ret = await $.ajax({
            type: 'post',
            url: 'http://localhost:8080/login',
            data: { name: $('.name').val(), passworld: $('.world').val() },
        })
        alert(ret);
        if (ret == '登录成功') {
            setCookie('username', 'Darren', 30) 
            location.href = 'http://localhost/jiguo/index.html';
           
        }
    })
}

//设置cookit
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    console.log(exdate);
    yz();
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//退出登录
$('.exit').click(function(e){
    e.preventDefault();
    setCookie('username', 'Darren', -100);
    location.href = 'http://localhost/jiguo/zuche.html?login';
})

res()
//注册
function res() {
    $('.resBtn').click(async function (e) {
        e.preventDefault();
        console.log('res');
        let ret = await $.ajax({
            type: 'post',
            url: 'http://localhost:8080/res',
            data: { name: $('.rname').val(), passworld: $('.rworld').val(), dePassworld: $('.dePassworld').val() }
        })
        alert(ret);
        if(ret == '注册成功'){
            location.href = 'http://localhost/jiguo/zuche.html?login';
        }
        return false
    })
}
yz()
//判断是不是登录状态,

function yz(){
    if(document.cookie){
        $('.res').css('display','none');
        $('.loginn').css('display','none');
        $('.exit').css('display','block');
    }else{
        $('.loginn').css('display','block');
        $('.res').css('display','block');
        $('.exit').css('display','none');
    }
}
