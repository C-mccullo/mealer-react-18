const router = require('express').Router();

const userController = require('../controllers/userController.js');
const User = require('../models/UserModel');
const passport = require("passport");

// USERS
router.get('/checkme', userController.checkUser);

// TODO: UHM WHUUUUT? why ar we getting all users?
router.get('/users', (req, res) => {
  // create controller function for this
  User.find()
    .then((docs) => res.send(docs));
});

router.post('/signup',
  userController.sanitizeUser,
  userController.checkUserAlreadyExists,
  userController.registerUser,
  passport.authenticate("local"),
  // mealPlanController.newUserMealPlan, // determine way to set up mealPlan in different way?
  // ** when get meal plan for a user, if a mealplan doesn't exist, create a newUserMealPlan
  userController.sendUser
);

router.post('/login',
  passport.authenticate('local', { failWithError: true }),
  userController.sendUser
);

router.get('/logout',
  userController.logoutUser
);

module.exports = router;
