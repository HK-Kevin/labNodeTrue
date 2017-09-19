let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/lab';
let db = mongoose.connect(url,function (e) {

});
let TitleSchema = new mongoose.Schema({
    title: String,
    author:String,
    content:String,
    click:Number,
    date:{type:Date,default:Date.now},
    type:String
});
let ClickSchema = new mongoose.Schema({
    click: String,
});
let IntroduceSchema = new mongoose.Schema({
    introduce: String,
    eng: String,
});
exports.Title = mongoose.model("Title", TitleSchema);
exports.Introduce = mongoose.model("Introduce", IntroduceSchema);