var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Image', new Schema({
  data: Buffer,
  contenttype: String
}));
