let express = require('express');
let Title = require('../model').Title;
let bodyParser = require('body-parser');
let multer = require('multer');
let path = require("path");
let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

let baseUrl = 'http://192.168.205.123:714';
let router = express.Router();

router.get('/search', function (req, res) {
    let {title} = req.query;
    let reg = new RegExp(title, 'i');
    Title.find({
        title: reg}, function (err, data) {
        if (err) console.log('search查询查询出错： ' + err);
        res.send(data)
    })
});

//add title
router.post('/add', function (req, res) {
    let oneTitle = req.body;
    Title.create(oneTitle, function (err) {
        res.end(err)
    })
});

//find all titles
router.post('/allTitles', function (req, res) {
    let {page, limit} = req.body;
    let query = Title.find();
    query.skip((page - 1) * limit)
        .limit(limit)
        .exec(function (err, data) {
            res.send(data)
        })
});

//update  title
router.put('/updateTitle', function (req, res) {
    let id = req.body._id;
    let updateData = req.body;
    Title.update({
        _id: id
    }, updateData, function (err, data) {
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

});

//delete  title
router.post('/deleteTitles', function (req, res) {
    let deleteId = req.body.id;
    Title.remove({
        _id: {
            $in: deleteId
        }
    }, function (err) {
        if (err) res.send(JSON.stringify({
            result: false
        }));
        else res.send(JSON.stringify({
            result: true
        }))
    })
});

//find  title by type
router.post('/typeTitles', function (req, res) {
    let {page, limit, type, condition} = req.body;
    let query = Title.find({
        type: {
            $in: type
        }
    });
    let queryTemp;
    switch (condition) {
        case 'important':
            queryTemp = query.sort({
                important: -1
            })
            break;
        case 'hard':
            queryTemp = query.sort({
                hard: -1
            })
            break;
        case 'titleClickTimes':
            queryTemp = query.sort({
                titleClickTimes: -1
            })
            break;
        default:
            queryTemp = query
    }
    queryTemp.skip((page - 1) * limit)
        .limit(limit)
        .exec(function (err, data) {
            res.send(data)
        })
});

//get ont title
router.get('/oneTitle', function (req, res) {
    let id = req.query.id;
    Title.findById(id, function (err, data) {
        res.send(data)
    })
});

/////////////////////上传图片/////////////////////////////////////////
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = path.resolve(__dirname).replace('routes','')+ 'upload/news';
        cb(null,uploadPath)
    },
    filename: function (req, file, cb) {
        let fileName = Date.parse(new Date()) + Math.round(Math.random() * 10000) + '';
        cb(null, fileName + '.png')
    }
});
let upload = multer({
    storage: storage
}).single('avator');

router.post('/upload', upload, function (req, res) {
    let picUrl = baseUrl + '/news/' + req.file.filename;
    let resObj = {
        errno: 0,
        data: [picUrl]
    };
    res.end(JSON.stringify(resObj))
});
////////////////////////////////////////////////////////////////

module.exports = router;