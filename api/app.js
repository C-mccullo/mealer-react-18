require('dotenv').config({ path: __dirname + '/./../.env' });

const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoConnect()
  .catch(err => console.log(err));

// sets up the authentication session between the server and the approved authenticated client source
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  maxAge: 3600000 // 1hr
}));

// use bodyParser to let app know what forms of data to expect from server requests
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// tells passport which type of strategy to expect for the User authentication
passport.use(User.createStrategy());

// tells pasport to expect information necessary to identify a user on subsequent requests.
passport.serializeUser(User.serializeUser((user, done) => done(null, user)));
passport.deserializeUser(User.deserializeUser((obj, done) => done(null, obj)));


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
