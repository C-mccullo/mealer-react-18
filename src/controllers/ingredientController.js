import Ingredient from '../models/IngredientModel';

export default class IngredientController {
  getIngredients = (req, res) => {
    Ingredient.find().then((docs) => {
      res.status(200).send(docs);
    })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

  searchIngredients = (req, res) => {
    const ingredient = req.query.ingredient;
    // TODO: set up conditional for empty query
    const RegExpIngredient = new RegExp(`(?=${ingredient}*)+\\w+`, "gi");
    Ingredient.find({
      name: {
        $regex: RegExpIngredient,
        $options: "gi"
      }
    })
    .then((docs) => {
      res.status(200).send(docs);
    })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

  postIngredient = (req, res) => {
    const IngredientModel = new Ingredient();
    const ingredient = Object.assign(IngredientModel, req.body);
    ingredient.save()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

  // add Middleware to check ingredient being posted
  deleteIngredient = (req, res) => {
    const foodId = req.params.id;
    Ingredient.remove({ _id: foodId }).then((doc) => {
      res.status(200).send(doc);
    })
      .catch((err) => {
        res.status(400).send(err);
      })
  }
}




