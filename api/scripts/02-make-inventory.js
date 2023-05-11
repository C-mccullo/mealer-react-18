require('dotenv').config({ path: __dirname + '/./../../.env' });
const day = require('dayjs');
const mongoose = require('mongoose');
const Ingredient = require('../models/IngredientModel');
const InventoryItem = require('../models/InventoryItemModel');
const User = require('../models/UserModel');

mongoose.connect(process.env.DB_URI);

async function main() {
  const user = await getMockUser().then(user => user);
  console.log('user: ', user);

  const ingredients = [
    { name: "Milk" },
    { name: "Tomatoes" },
    { name: "Pasta" },
    { name: "Thai Chicken Soup" },
    { name: "Sprouted Grain Bread" },
    { name: "Orange Juice" },
    { name: "Alfredo Sauce" },
    { name: "Eggs" },
    { name: "Mushrooms" },
    { name: "Parmesean Cheese" },
    { name: "Chocolate Coconunt Muffins" },
    { name: "Bananas" },
    { name: 'Chicken thighs' },
    { name: "Red Peppers" },
    { name: "Spinach" }
  ]

  const inventoryItems = [
    {
      user: undefined,
      ingredient: 'Milk',
      quantity: 1,
      portions: 10,
      expiry: day('2023-10-1').format('MMM D, YYYY')
    },
    {
      user: undefined,
      ingredient: 'Pasta',
      quantity: 3,
      portions: 6,
      expiry: null
    },
    {
      user: undefined,
      ingredient: 'Thai Chicken Soup',
      quantity: 1,
      portions: 1,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Sprouted Grain Bread',
      quantity: 1,
      portions: 12,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Orange Juice',
      quantity: 1,
      portions: 10,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Chocolate Coconut Muffins',
      quantity: 1,
      portions: 4,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Parmesean Cheese',
      quantity: 1,
      portions: 12,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Spinach',
      quantity: 1,
      portions: 8,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Red Peppers',
      quantity: 1,
      portions: 4,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Tomatoes',
      quantity: 4,
      portions: 1,
      expiry: day('2023-10-1').format("MMM D, YYYY")
    },
    {
      user: undefined,
      ingredient: 'Bananas',
      expiry: day('2023-10-1').format("MMM D, YYYY"),
      portions: 3,
      quantity: 1
    },
  ]

  async function getIngredient(itemName) {
    const res = await Ingredient.findOne({ name: itemName }).exec()
    if (res) {
      console.log(res)
      return res
    }

    const item = ingredients.find(i => i.name === itemName)
    console.log('getIngredient: to be added: ', item, itemName);
    const model = new Ingredient();
    Object.assign(model, item);
    const ingredient = await model.save()
      .then((i) => i)
      .catch(err => {
        console.log('error: ', err)
        process.exit(7)
      })
    return ingredient
  }

  async function populateIngredients() {
    await ingredients.forEach(async (ingredient) => {
      // check if ingredient exists
      const res = await Ingredient.findOne({ name: ingredient.name }).select('name').lean();
      if (res) {
        return
      } else {
        const model = new Ingredient();
        Object.assign(model, ingredient);
        await model.save()
          .then((i) => console.log('populateIngredients: item saved ', i.name))
          .catch(err => {
            console.log('error: ', err)
            process.exit(7)
          })
      }
    });
  }

  async function getMockUser() {
    const data = await User.findOne({ email: process.env.MOCK_USER_EMAIL })
      .then((doc) => {
        console.log('user: ', doc);
        return doc
      })
      .catch(err => {
        console.log(err);
        process.exit(7);
      })
    return data;
  }

  async function populateInventoryItems(user) {
    await inventoryItems.forEach(async (food) => {
      // get the corresponding ingredient id or
      const ingredient = await getIngredient(food.ingredient)
      const model = new InventoryItem();
      Object.assign(model, {
        ...food,
        user: user._id,
        ingredient: ingredient._id
      });
      await model.save()
        .then(() => console.log('populateInventoryItems: inventory item saved', food.ingredient))
        .catch((err) => console.log(err))
    });
  }

  async function removeInventoryItems(user) {
    await InventoryItem.deleteMany({ user: user._id })
      .then(() => {
        console.log('inventory deleted')
      })
      .catch((err) => console.log(err))
    return user;
  }
  getMockUser()
    .then(() => removeInventoryItems(user))
    .then(()=> populateIngredients())
    .then(()=> populateInventoryItems(user))
}

main();








