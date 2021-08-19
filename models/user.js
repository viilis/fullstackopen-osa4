const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 3,
    max: 30,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    min: 3,
    max: 30,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
});

userSchema.plugin(unique);

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // never returns password
  },
});

module.exports = mongoose.model('User', userSchema);
