require('dotenv').config({ path: __dirname + '/./../../.env' });
const mongoose = require('mongoose');
const Recipe = require('../models/RecipesModel');

mongoose.connect(process.env.DB_URI);

const recipes = [
  // TODO: construct recipe objects later (kinda complex for a migration script)
]

async function main() {

  Recipe.remove({}, () => {
    console.log('All foods removed');
  });

  if (recipes) {
    recipes.forEach(async (recipe) => {
      const model = new Recipe();
      Object.assign(model, recipe);
      await model.save((err, doc) => {
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
}

main();