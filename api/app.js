require('dotenv').config({ path: __dirname + '/./../.env' });

const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');
const expressValidator = require("express-validator");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;

const usersRouter = require('./routes/user');
const ingredientRouter = require('./routes/ingredient');
const inventoryRouter = require('./routes/inventory');
const mealPlanRouter = require('./routes/mealPlan');
const recipeRouter = require('./routes/recipe');

const User = require('./models/UserModel');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

async function mongoConnect() {
  await mongoose.connect(process.env.DB_URI);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoConnect()
  .catch(err => console.log(err));

// use bodyParser to let app know what forms of data to expect from server requests
app.use(bodyParser.json());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// tells pasport to expect information necessary to identify a user on subsequent requests.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// sets up the authentication session between the server and the approved authenticated client source
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// tells passport which type of strategy to expect for the User authentication
passport.use(User.createStrategy());

app.use('/api/v1/', usersRouter);
app.use('/api/v1/', ingredientRouter);
app.use('/api/v1/', inventoryRouter);
app.use('/api/v1/', mealPlanRouter);
app.use('/api/v1/', recipeRouter);

// error handler
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`App is now listening at http://localhost:${process.env.PORT}!`);
})

module.exports = app;
