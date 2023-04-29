import { Router } from 'express';
import * as foodItemController from '../controllers/foodItemController';
import * as userController from '../controllers/userController';
const router = Router();
// INVENTORY
router.get('/api/foods',
  userController.isAuthorized,
  foodItemController.getFoods
);

router.post('/api/foods/',
  userController.isAuthorized,
  foodItemController.checkIngredientExist,
  foodItemController.checkByExpiry
);

router.delete('/api/foods/:id',
  userController.isAuthorized,
  foodItemController.deleteFood
);

module.exports = router;