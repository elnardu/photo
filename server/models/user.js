var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	admin: {
    type: Boolean,
    default: false
  },
	points: {
    type: Number,
    default: 0
  },
  name: String,
  surname: String,
  email: String,
	dialogs: [Schema.Types.ObjectId]
}));
