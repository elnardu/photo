var express = require("express"),
	path = require('path'),
	ObjectId = require('mongoose').Types.ObjectId;
Message = require("../models/message"),
User = require("../models/user");

var router = express.Router();

router.route('/getDialogs').post((req, res) => {
	const userId = req.decoded.id;

	User.findById(userId).then((user) => {
		res.json({success: true, data: user.dialogs});
	});
});

router.route('/getDialogsData').post((req, res) => {
	const userId = req.decoded.id;
	User.aggregate([
		{
			"$match": {
				"_id": new ObjectId(userId)
			}
		}, {
			"$lookup": {
				"from": "users",
				"localField": "dialogs",
				"foreignField": "_id",
				"as": "dialogs"
			}
		}, {
			"$project": {
				"_id": 0,
				"dialogs.username": 1,
				"dialogs.name": 1,
				"dialogs.surname": 1,
				"dialogs._id": 1
			}
		}
	]).exec((err, data) => {
		res.send({success: true, data: data[0].dialogs});
	});

});

router.route('/getMessages').post((req, res) => {
	const userId = new ObjectId(req.decoded.id),
		withUser = new ObjectId(req.body.with);

	User.findById(userId).then((user) => {
		if (user.dialogs.indexOf(withUser) != -1) {
			Message.find({
				$or: [
					{
						to: withUser,
						from: userId
					}, {
						to: userId,
						from: withUser
					}
				]
			}).sort({date: -1}).then((messages) => {
				res.json({success: true, data: messages});
			});
		}
	});
});

router.route('/createDialog').post((req, res) => {
	const userId = req.decoded.id,
		withUser = new ObjectId(req.body.with);

	if (req.decoded.id == req.body.with) {
		res.json({success: false, error: "Нельзя писать самому себе"});
		return;
	}
	User.findById(userId).then((user) => {
		if (user.dialogs.indexOf(withUser) == -1) {
			user.dialogs.push(withUser);
			user.save().then(() => {

				User.findById(withUser).then((user) => {
					if (user.dialogs.indexOf(userId) == -1) {
						user.dialogs.push(userId);
						user.save().then(() => {});
						res.json({success: true});
					} else {
						res.json({success: true});
					}
				});

			});
		} else {
			res.json({success: true});
		}
	});
});

router.route('/sendMessage').post((req, res) => {
	const userId = new ObjectId(req.decoded.id),
		toUser = new ObjectId(req.body.to),
		text = req.body.text;

	const mes = new Message({from: userId, to: toUser, text: text, date: new Date()});
	mes.save().then(() => {
		res.json({success: true});
	})
});

module.exports = router;
