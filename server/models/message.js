var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
  from: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  text: String,
  date: Date
}));
