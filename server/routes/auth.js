var express = require("express"),
	User = require("../models/user"),
	jwt = require('jsonwebtoken');


var router = express.Router();

router.route('/register').post(function(req, res) {
	var username = req.body.username,
		password = req.body.password,
    email = req.body.email,
    name = req.body.name,
    surname = req.body.surname;

	if (!username || !password || !name || !surname || !email) {
		res.json({error: "Not enough data", success: false});
		return;
	}

	var user = new User({
    username: username,
    password: password,
    name: name,
    surname: surname,
    email: email
  });

	user.save(function(err) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.json({error: "Пользователь с таким ником уже есть!", success: false});
				return;
			}
			throw err;
		}

		console.log("User " + username + " sign up!");
		var token = jwt.sign({
			username: user.username,
			id: user._id
		}, req.app.get('secret'), {
			expiresIn: 86400 // expires in 24 hours
		});
		res.json({success: true, token: token});
	});
});

router.route('/login').post(function(req, res) { //SIGN IN
	var username = req.body.username,
		password = req.body.password;

	if (!username || !password) {
		res.json({error: "Not enough data", success: false});
		return;
	}

	User.findOne({
		username: username
	}, function(err, user) {
		if (err)
			throw err;
		if (!user) {
			res.json({success: false, error: "Этого пользователя не существует!"});
		} else {
			if (user.password != password) {
				res.json({success: false, error: "Неправильный пароль!"});
			} else {
				var token = jwt.sign({
					username: user.username,
					id: user._id
				}, req.app.get('secret'), {
					expiresIn: 86400 // expires in 24 hours
				});
				res.json({success: true, token: token, admin: user.admin});
				console.log("User " + user.username + " sign in!");
			}
		}
	});
});
module.exports = router;
