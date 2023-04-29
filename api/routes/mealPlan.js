const router = require('express').Router();
const userController = require('../controllers/userController');
const mealPlanController = require('../controllers/mealPlanController');

// MEAL PLAN
router.get("/api/mealPlan",
  userController.isAuthorized,
  mealPlanController.getMealPlan
);

router.put("/api/mealPlan/:day",
  userController.isAuthorized,
  mealPlanController.restoreUnusedFoodItems,
  mealPlanController.updateFoodItems,
  mealPlanController.updateMealPlan
);

module.exports = router;