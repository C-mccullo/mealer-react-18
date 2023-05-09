const Router = require('express');
const foodItemController = require('../controllers/foodItemController.js');
const userController = require('../controllers/userController.js');
const router = Router();
// INVENTORY
router.get('/foods',
  userController.isAuthorized,
  foodItemController.getFoods
);

router.post('/foods',
  userController.isAuthorized,
  foodItemController.checkIngredientExist,
  foodItemController.checkByExpiry
);

router.delete('/foods/:id',
  userController.isAuthorized,
  foodItemController.deleteFood
);

module.exports = router;