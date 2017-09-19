let express = require('express');
let app = express();
let fs = require('fs');
let path = require("path");
let bodyParser = require('body-parser');
let multer = require('multer');
let Title = require('./model').Title;
let urlencodedParser = bodyParser.urlencoded({
    extended: true
});
let {news,page} = require('./routes');
let router = express.Router();


let baseUrl = 'http://192.168.205.123:714';

app.use(express.static('public')); //静态文件托管
app.use(express.static('upload')); //静态文件托管
app.use(express.static('node_modules')); //静态文件托管
app.use(bodyParser.json()); //一定要设置

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ",Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

/*



;*/

///////////////////////////////////////路由设置/////////////////////////

app.use('/news', news);
app.use('/', page);

app.use(function (req, res, next) { //捕捉404页面
    res.status(404).send('Sorry can not find that')
})

///////////////////////////////////////端口///////////////////////////////////
let server = app.listen(714, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
