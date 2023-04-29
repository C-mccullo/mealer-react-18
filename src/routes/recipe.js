const router = require('express').Router();
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

// RECIPES
router.get("/api/recipes",
  userController.isAuthorized,
  recipeController.getRecipes
);

router.post("/api/recipes",
  userController.isAuthorized,
  recipeController.postRecipe
);

router.delete("/api/recipes/:id",
  userController.isAuthorized,
  recipeController.deleteRecipe
);

module.exports = router;