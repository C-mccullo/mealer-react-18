
const Router = require('express');
const IngredientController = require("../controllers/ingredientController.js");
const userController = require('../controllers/userController.js');

const router = Router();

router.get("/ingredients", IngredientController.getIngredients);

router.get("/ingredients/search", IngredientController.searchIngredients);

router.post("/ingredients",
  userController.isAuthorized,
  IngredientController.postIngredient
);

module.exports = router;