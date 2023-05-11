require('dotenv').config({ path: __dirname + '/./../../.env' });
const mongoose = require('mongoose');
const User = require('../models/UserModel');

const uri = process.env.DB_URI

console.log('uri', uri)

mongoose.connect(process.env.DB_URI);

async function MakeNewUser() {
  const firstName = process.env.MOCK_USER_FIRSTNAME;
  const lastName = process.env.MOCK_USER_LASTNAME;
  const email = process.env.MOCK_USER_EMAIL;
  const password = process.env.MOCK_USER_PASSWORD

  const user = await new User({ email, firstName, lastName });
  User.register(user, password, (err, user) => {
    if (err) {
      console.log('unable to register user: ', err)
      return;
    }
    console.log("registeration successful! ", user);
    return user
  })
}
const newUser = MakeNewUser();

if (newUser) {
  console.log('new mock user generated: ', newUser)
}