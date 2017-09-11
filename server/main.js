var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	morgan = require('morgan'),
  path = require('path'),
	http = require('http').Server(app);

var config = require("./config");

var authRouter = require('./routes/auth'),
  postRouter = require('./routes/post'),
  imagesRouter = require('./routes/images'),
  messagesRouter = require('./routes/messages'),
	userRouter = require('./routes/user');


var staticPath = path.resolve(__dirname, '..', 'client', 'dist');

mongoose.Promise = global.Promise; //tell mongoose to use default promises
mongoose.connect(config.database);

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/api", function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, app.get('secret'), function(err, decoded) {
			if (err) {
				return res.json({success: false, error: 'Failed to authenticate token.'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.send({success: false, error: 'No token provided.'});
	}
});

app.use(express.static(staticPath));
app.use('/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/user', userRouter);
app.use('/images', imagesRouter);



http.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});
