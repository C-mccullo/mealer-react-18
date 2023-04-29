const router = require('express').Router();

const userController = require('../controllers/userController');
const mealPlanController = require('../controllers/mealPlanController');
const User = require('../models/UserModel');
const passport = require("passport");

// USERS
router.get('/getme', userController.checkUser);

router.get('/users', (req, res) => {
  User.find()
    .then((docs) => res.send(docs));
});

router.post('/signup',
  userController.sanitizeUser,
  userController.registerUser,
  passport.authenticate("local"), // should passport be in its own auth middleware?
  mealPlanController.newUserMealPlan, // determine way to set up mealPlan in different way?
  userController.sendUser
);

router.post('/login',
  passport.authenticate("local"),
  userController.sendUser
);

router.get('/logout', userController.logoutUser);

module.exports = router;
