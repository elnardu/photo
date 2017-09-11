var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({
  image: Schema.Types.ObjectId,
  text: String,
  date: Date,
  likes: {
    type: Number,
    default: 0
  },
  author: String,
  comments: [{
    author: Schema.Types.ObjectId,
    text: String
  }]
}));
