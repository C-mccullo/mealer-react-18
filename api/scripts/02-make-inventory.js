require('dotenv').config();

const day = require('dayjs');
const mongoose = require('mongoose');
const Ingredient = require('../models/IngredientModel');
const FoodItem = require('../models/FoodItemModel');

mongoose.connect(process.env.DB_URI);

async function removeFoodItems() {
  await FoodItem.deleteMany()
    .then(() => console.log('ingredients deleted'))
    .catch((err) => console.log(err))
}

const ingredients = {
  milk: new Ingredient({ name: "Milk" }),
  tomatoes: new Ingredient({ name: "Tomatoes" }),
  pasta: new Ingredient({ name: "Pasta" }),
  thaiChickenSoup: new Ingredient({ name: "Thai Chicken Soup" }),
  sproutedGrainBread: new Ingredient({ name: "Sprouted Grain Bread" }),
  orangeJuice: new Ingredient({ name: "Orange Juice" }),
  alfredoSauce: new Ingredient({ name: "Alfredo Sauce" }),
  eggs: new Ingredient({ name: "Eggs" }),
  mushrooms: new Ingredient({ name: "Mushrooms" }),
  parmesean: new Ingredient({ name: "Parmesean Cheese" }),
  chocoMuffin: new Ingredient({ name: "Chocolate Coconunt Muffins" }),
  bannanas: new Ingredient({ name: "Bannanas" }),
  chicken: new Ingredient({ name: 'Chicken thighs' }),
  peppers: new Ingredient({ name: "Red Peppers" }),
  spinach: new Ingredient({ name: "Spinach" })
}

async function populateIngredients() {
  await Object.values(ingredients).forEach(i => {
    i.save()
      .then(() => console.log(`food item ${i.name}`))
  });
}

const foods = [
  {
    ingredient: ingredients.tomatoes._id,
    quantity: 5,
    portions: 2,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.milk._id,
    quantity: 1,
    portions: 10,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.pasta._id,
    quantity: 3,
    portions: 6,
    expiry: null
  },
  {
    ingredient: ingredients.thaiChickenSoup._id,
    quantity: 1,
    portions: 1,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.sproutedGrainBread._id,
    quantity: 1,
    portions: 12,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.orangeJuice._id,
    quantity: 1,
    portions: 10,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.chocoMuffin._id,
    quantity: 1,
    portions: 4,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.parmesean._id,
    quantity: 1,
    portions: 12,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.spinach._id,
    quantity: 1,
    portions: 8,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.peppers._id,
    quantity: 1,
    portions: 4,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.tomatoes._id,
    quantity: 4,
    portions: 1,
    expiry: day('2023-10-1').format("MMM D, YYYY")
  },
  {
    ingredient: ingredients.bannanas._id,
    expiry: day('2023-10-1').format("MMM D, YYYY"),
    portions: 3,
    quantity: 1
  },
]

function populateFoodItems() {
  foods.forEach(async (food) => {
    const model = new FoodItem();
    Object.assign(model, food);
    await model.save()
      .then(() => console.log(`item saved ${food.name}`))
      .catch((err) => console.log(err))
  });
}

removeFoodItems()
  .then(()=> populateIngredients())
  .then(()=> populateFoodItems())
