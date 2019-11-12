const express = require('express');
const User = require('./mongo.js');
console.log(User.find);
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body);
    let { name, passworld } = req.body;
    User.find((err, data) => {
        if (err) {
            console.log('查询失败', err);
        } else {
            console.log(data);
            let ret = data.filter((ele, index) => {
                return ele.name == name && ele.passworld == passworld
            })
            console.log(ret);
            if (ret.length > 0) {
                res.send('登录成功')
            } else {
                res.send('账号或者密码不正确');
            }
        }
    })
})

router.post('/res', (req, res) => {
    console.log(req.body);
    let { name, passworld, dePassworld } = req.body;
    if (passworld != dePassworld) {
        res.send('两次密码不一致')
    }else if(name.length == 0 || passworld.length == 0 ||dePassworld == 0){
        res.send('请输入账号或密码')
    } else {
        User.find((err, data) => {
            if (err) {
                console.log('查询失败')
            } else {
                let ret = data.filter(ele => ele.name == name);
                if (ret.length > 0) {
                    res.send('用户名已占用');
                } else {
                    new User(req.body).save((err, data) => {
                        if (err) {
                            console.log('添加失败')
                        } else {
                            console.log('添加成功');
                            res.send('注册成功');
                        }
                    })
                }
            }
        })

    }
})
// User.remove({_id:'5d21c10b03c4013bdc0b3d79'},function(err,ret){
//     if(err){
//         console.log('删除失败');
//     }else{
//         console.log('删除成功');
//     }
// })
module.exports = router;