require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/RecipesModel');

mongoose.connect(process.env.DB_URI);

const recipes = [

]

// Drop any existing data inside of the movies table
Recipe.remove({}, () => {
  console.log('All foods removed');
});

if (recipes) {
  recipes.forEach((recipe) => {
    const model = new Recipe();
    Object.assign(model, recipe);
    model.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
    });
    return;
  });
} else {
  console.log("sorry, recipes is an empty array")
}