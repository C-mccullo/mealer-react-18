require('dotenv').config();
const mongoose = require('mongoose');
const MealPlan = require('../models/MealPlanModel');

mongoose.connect(process.env.DB_URI);

const mealPlans = [
  {
    user: mongoose.Types.ObjectId,
    monday:[],
    tuesday: [],
    wednesday: [],
    thursday:[],
    friday:[],
    saturday: [],
    sunday: []

  }
]

// Drop any existing data inside of the meal plan table
MealPlan.remove({}, () => {
  console.log('All foods removed');
});

mealPlans.forEach((plan) => {
  const model = new MealPlan();
  Object.assign(model, plan);
  model.save((err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
  });
  return;
});