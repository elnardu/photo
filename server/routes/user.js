var express = require("express"),
	path = require('path'),
	ObjectId = require('mongoose').Types.ObjectId;
User = require("../models/user");

var router = express.Router();

router.route('/get').post((req, res) => {
	const id = req.body.id,
		username = req.body.username;

	User.findOne({
		$or: [
			{
				"username": username
			}, {
				"_id": new ObjectId(id)
			}
		]
	}).then((user) => {
		let data = {
			username: user.username,
			_id: user._id,
			admin: user.admin,
			points: user.points,
			name: user.name,
			surname: user.surname
		}
		res.send({success: true, data: data});
	})
});

router.route('/find').post((req, res) => {
	const query = req.body.query;

	User.find({
		username: {
			$regex: query,
			$options: "i"
		}
	}).limit(5).then((users) => {
		let data = [];
		if (users.length != 0) {
			users.forEach((el) => {
				data.push({username: el.username, name: el.name, surname: el.surname, _id: el._id})
			});
			res.json({success: true, data: data});
		} else {
			res.json({success: false});
		}
	});
});

module.exports = router;
