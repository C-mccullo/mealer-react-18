const router = require('express').Router();
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

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