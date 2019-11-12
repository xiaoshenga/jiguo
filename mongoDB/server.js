const express = require('express');
const router = require('./router.js')
const body = require('body-parser');
const server = express();

server.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
})
server.use(body.urlencoded({extended:false}))

server.use(router);


server.listen(8080);