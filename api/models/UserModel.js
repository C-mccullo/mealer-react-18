const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Sorry, invalid email address'],
    required: 'please add an email address'
  },
  firstName: {
    type: String,
    required: 'Please add a first name for login',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please add a last name for login',
    trim: true
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);

