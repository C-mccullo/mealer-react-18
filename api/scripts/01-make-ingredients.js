require('dotenv').config({ path: __dirname + '/./../../.env' });
const mongoose = require('mongoose');
const Ingredient = require('../models/IngredientModel');

mongoose.connect(process.env.DB_URI);

const foods = [
  {
    name: "Tomatoes"
  },
  {
    name: "Milk"
  },
  {
    name: "Pasta"
  },
  {
    name: "Chicken Soup"
  },
  {
    name: "Sprouted Grain Bread"
  },
  {
    name: "Orange Juice"
  },
  {
    name: "Alfredo Sauce"
  },
  {
    name: "Eggs"
  },
  {
    name: "Mushrooms"
  },
  {
    name: "Parmesan cheese"
  },
  {
    name: "Chocolate Coconut Muffins"
  },
  {
    name: "Bananas"
  },
  {
    name: "gravy mix"
  },
  {
    name: "chicken thighs"
  },
  {
    name: "red peppers"
  },
  {
    name: "spinach"
  }
]

Ingredient.deleteMany();
console.log('Ingredients Deleted')

foods.forEach(async (food) => {
  const model = new Ingredient();
  Object.assign(model, food);
  await model.save()
    .then(() => console.log(`food saved ${food.name}`))
    .catch((err) => console.log(err))
});