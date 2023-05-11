const mongoose = require('mongoose');
const { flatten } = require('lodash');

const MealPlan = require('../models/MealPlanModel');
const Recipe = require('../models/RecipesModel');
const InventoryItem = require('../models/InventoryItemModel');

exports.newUserMealPlan = (req, res, next) => {
  console.log("new User MealPlan: ", req.user);
  const userID = new mongoose.Types.ObjectId(req.user._id);
  const mealPlanModel = new MealPlan();
  const mealPlan = Object.assign(mealPlanModel, {
    user: userID,
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  })
  mealPlan.save()
    .then(()=> {
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

  exports.getMealPlan = (req, res) => {
    const userID = req.user._id;
    // console.log("meal Controller; ", userID);
    // excluding _id, __v and user from the response object
    MealPlan.findOne({user: userID }, {_id: 0, __v: 0, user: 0})
      .populate("monday tuesday wednesday thursday friday saturday sunday")
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(200).send(doc);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

  // will need to remove recipes from meal plan and restore foodItems quantities
  exports.restoreUnusedFoodItems = (req, res, next) => {
    const day = req.params.day;
    const userID = req.user._id;

    MealPlan.findOne({ user: userID })
      .then((doc)=> {
        const recipes = doc[day]
        const recipeIds = recipes.map(id => {
          return new mongoose.Types.ObjectId(id)
        })
        Recipe.find({
          _id: {
            $in: recipeIds
          }
        })
        .then((docs) => {
          const ingredients = flatten(docs.map((doc) => {
            return doc.ingredients.map((i) => {
              const ingredient = { id: i.ingredient, portionSize: i.portionSize };
              return ingredient;
            })
          }))
          console.log("restore foodItems: ", ingredients);
          function restoreItem(i) {
            return new Promise((resolve, reject) => {
              InventoryItem.findOneAndUpdate({
                ingredient: i.id,
                user: userID
              }, {

                $inc: {
                  quantity: +i.portionSize
                }
              }, {
                  new: true
                })
                .then((doc) => {
                  if (!doc) {
                    return
                  } else if (doc.quantity === 0) {
                    // console.log("delete this doc: ", doc);
                    doc.deleteOne();
                  }
                })
                .then(() => resolve("updated item :)"))
                // TODO: if restoration quantity results to be zero, then remove the fooditem
                .catch((err) => {
                  console.log(err);
                  reject("issue with updating item :(")
                })
            })
          }
          let updateAll = [];
          // then with array of ingredients add back the portionSizes used in the recipe
          ingredients.forEach((i) => {
            updateAll.push(restoreItem(i));
          })
          // wait until all the food items used in the recipes have been updated
          Promise.all(updateAll)
            .then(() => {
              console.log("foodItems have been restored!")
              next()
            })
        })
      })
        .catch(err=> {
          console.log(err);
          res.status(500).send({message: "user mealplan not found"})
        })
  }

  exports.updateMealPlan = (req, res, next) => {
    const day = req.params.day;
    const meals = req.body;
    const userID = req.user._id;
    const mealArray = meals.map((meal) => {
      return meal._id;
    });

    MealPlan.findOne({user: userID}).then((doc) => {
      doc[day] = mealArray;
      doc.save()
        .then((saved) => {
          res.status(200).send(saved)
          next();
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

  // 👇 This controller should probably be called before the save of the mealPlan document
  exports.updateFoodItems = (req, res, next) => {
    const userID = new mongoose.Types.ObjectId(req.user._id);
    const day = req.params.day;
    const recipes = req.body;
    const recipeIds = recipes.map(i => { return new mongoose.Types.ObjectId(i._id)})
    Recipe.find({
      _id: {
        $in: recipeIds
      }
    })
    .then((docs) => {
      const ingredients = flatten(docs.map(doc => {
        return doc.ingredients.map(i => {
          const ingredient = { id: i.ingredient, portionSize: i.portionSize };
          return ingredient;
        })
      }))

      // function to update the foodItems used the recipes or insert if non already exists
      function updateItem(i) {
        return new Promise((resolve, reject) => {
          // const portionUpsert = 1 - i.portionSize;
          // console.log("portionUpsert", portionUpsert);
          InventoryItem.findOneAndUpdate({
            ingredient: i.id,
            user: userID
          }, {
            $setOnInsert: {
              user: userID,
              ingredient: i.id,
              expiry: null,
            },
            $inc: {
              quantity: -i.portionSize
            }
          },
          {
            upsert: true,
            setDefaultsOnInsert: true,
          })
          .then(()=> resolve("item update successful :)"))
          .catch((err)=> reject(err))
        })
      }

      let updateAll = []
      ingredients.forEach((i) => {
        updateAll.push(updateItem(i));
      })
      // wait until all the food items used in the recipes have been updated
      Promise.all(updateAll)
        .then(()=> console.log("they're all saved!"))
        // trigger next to move on and to updateMealPlan controller
        .then(()=> next())
    })
  }






