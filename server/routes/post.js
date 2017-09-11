var express = require("express"),
  multer = require('multer'),
  uuid = require('uuid/v1'),
  fs = require('fs'),
  path = require('path'),
  Post = require("../models/post"),
  Image = require("../models/image");

var router = express.Router();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/')
  },
  filename: function(req, file, cb) {
    cb(null, uuid() + file.originalname);
  }
});

var upload = multer({storage: storage});

router.route('/upload').post(upload.any(), function(req, res) {
  console.log(req.files);
  if (req.files[0].mimetype.slice(0, 5) != 'image') {
    res.json({success: false, error: "Поддерживается только загрузка картинок"});
    return;
  }
  res.json({name: req.files[0].filename, type: req.files[0].mimetype, success: true})
});

router.route('/new').post(function(req, res) {
  var text = req.body.text,
    author = req.decoded.username,
    type = req.body.type,
    img = req.body.image;

  if (!text || !author || !img) {
    res.json({error: "Not enough data", success: false});
    return;
  }

  var imgPath = path.resolve(__dirname, '..', 'tmp', img);

  var image = new Image({data: fs.readFileSync(imgPath), contenttype: type});
  image.save().then(img => {
    var post = new Post({text: text, author: author, image: img._id, date: new Date});
    post.save().then(p => {
      res.json({post: p, success: true})
    });
  });
});

router.route('/list').post(function(req, res) {
  Post.find().sort({date: -1}).limit(5).then(posts => {
    res.json({posts: posts, success: true});
  });
});

module.exports = router;
