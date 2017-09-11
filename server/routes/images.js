var express = require("express"),
  path = require('path'),
	Image = require("../models/image");

var router = express.Router();

router.route('/raw/:file').get((req, res) => {
  res.sendFile(path.resolve(__dirname, '..','tmp', req.params.file));
});

router.route('/:id').get((req, res) => {
  Image.findById(req.params.id).then(img=>{
    res.type(img.contenttype);
    res.send(img.data);
  });
});

module.exports = router;
