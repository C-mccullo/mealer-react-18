const router = require('express').Router();
const userController = require('../controllers/userController.js');
const recipeController = require('../controllers/recipeController.js');

// RECIPES
router.get("/recipes",
  userController.isAuthorized,
  recipeController.getRecipes
);

router.post("/recipes",
  userController.isAuthorized,
  recipeController.postRecipe
);

router.delete("/recipes/:id",
  userController.isAuthorized,
  recipeController.deleteRecipe
);

module.exports = router;