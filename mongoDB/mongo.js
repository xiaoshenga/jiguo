const mongoose = require('mongoose');

const Schema= mongoose.Schema;

mongoose.connect('mongodb://localhost/zuce');

let obj = new Schema({
    name:{
        type:String,
        required:true
    },
    passworld:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('User',obj);