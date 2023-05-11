const Router = require('express');
const inventoryController = require('../controllers/InventoryController.js');
const userController = require('../controllers/userController.js');
const router = Router();
// INVENTORY
router.get('/inventory',
  userController.isAuthorized,
  inventoryController.getFoods
);

router.post('/inventory',
  userController.isAuthorized,
  inventoryController.checkIngredientExist,
  inventoryController.checkByExpiry
);

router.delete('/inventory/:id',
  userController.isAuthorized,
  inventoryController.deleteFood
);

module.exports = router;