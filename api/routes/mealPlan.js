const router = require('express').Router();
const userController = require('../controllers/userController.js');
const mealPlanController = require('../controllers/mealPlanController.js');

// MEAL PLAN
router.get("/mealplan",
  userController.isAuthorized,
  mealPlanController.getMealPlan
);

router.put("/mealplan/:day",
  userController.isAuthorized,
  mealPlanController.restoreUnusedFoodItems,
  mealPlanController.updateFoodItems,
  mealPlanController.updateMealPlan
);

module.exports = router;