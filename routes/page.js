let express = require('express');
let bodyParser = require('body-parser');
let path = require("path");
let urlencodedParser = bodyParser.urlencoded({
    extended: true
});
let fs = require('fs');

let baseUrl = 'http://192.168.205.123:714';
let router = express.Router();


//Get achievement Data
router.get('/achievement', urlencodedParser, function (req, res) {
    let homeData = fs.readFile('./public/json/achievement.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get homeData Data
router.get('/homeData', urlencodedParser, function (req, res) {
    fs.readFile('public/json/homeData.json', 'utf-8', function (err, data) {
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"})
        res.end(data)
    })
});

//Get introduce Data
router.get('/introduce', urlencodedParser, function (req, res) {
    fs.readFile('public/json/introduce.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get researchTree Data
router.get('/researchTree', urlencodedParser, function (req, res) {
    fs.readFile('public/json/researchTree.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get student Data
router.get('/student', urlencodedParser, function (req, res) {
    fs.readFile('public/json/student.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get teacherComponent Data
router.get('/teacherComponent', urlencodedParser, function (req, res) {
    fs.readFile('public/json/teacherComponent.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get teacherIntroduce Data
router.get('/teacherIntroduce', urlencodedParser, function (req, res) {
    fs.readFile('public/json/teacherIntroduce.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get teacherList Data
router.get('/teacherList', urlencodedParser, function (req, res) {
    fs.readFile('public/json/teacherList.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});

//Get teacherList Data
router.get('/teacherList', urlencodedParser, function (req, res) {
    fs.readFile('public/json/teacherList.json', 'utf-8', function (err, data) {
        res.end(data)
    })
});


//find a title and add clickNum
router.get('/addClick', function (req, res) {
    let id = req.query.id;

    Title.findById(id, function (err, data) {
        data.titleClickTimes++;
        Title.update({
            _id: id
        }, data, function (err, data) {
            if (err) {
                res.end(JSON.stringify({
                    result: false
                }))
            } else {
                res.end(JSON.stringify({
                    result: true
                }))
            }
        })
    })
});


module.exports = router;