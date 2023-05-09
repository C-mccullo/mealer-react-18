const mongoose = require('mongoose');
const User = require('../models/UserModel');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

// updated express validator, this is needed to use new api inside a middleware
const userValidatorSchema = [
  // sanitize req body firstName and lastName
  body(["firstName", "lastName"])
    .notEmpty()
    .isString()
    .trim(),
  // check if email field is valid
  body("email")
    .notEmpty()
    .isString()
    .isEmail()
    .normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    }),
  body("password")
    .notEmpty()
]


exports.sanitizeUser = async (req, res, next) => {
  await Promise.all(userValidatorSchema.map(schema => schema.run(req)))
  // normalize email and standardize email field
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next()
  }
  const errorList = []
  errors.array().map(err => errorList.push({ [err.param]: err.msg }))
  return res.status(422).json({
    errors: errorList,
  })
}

exports.checkUserAlreadyExists = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email })
  if (user) {
    res.status(422).json({
      errors: 'user with email already exists'
    })
  } else {
    next();
  }
}

exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const user = new User({ email, firstName, lastName });
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      console.log("registeration successful! ", user);
      next();
    }
  })
}

exports.sendUser = (req, res) => {
  res.send(req.user);
}

exports.checkUser = (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
    next();
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
}

exports.logoutUser = (req, res) => {
  // is logout a validator method? or session
  req.logout();
  res.json("User is logged out");
}

exports.isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
