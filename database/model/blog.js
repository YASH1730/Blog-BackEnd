const mongoose = require('mongoose');

const user  = mongoose.Schema({
    uuid : {type : String,unique : true },
    author : {type : String, require : true},
    title : String,
    image : String,
    descripition : String,
})

module.exports = mongoose.model('blogData',user);
