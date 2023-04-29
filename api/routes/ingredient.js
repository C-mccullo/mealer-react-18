
import { Router } from 'express';
import IngredientController from "../controllers/ingredientController";
import userController from '../controllers/userController';

const router = Router();

router.get("/ingredientList", IngredientController.getIngredients);

router.get("/ingredientList/search", IngredientController.searchIngredients);

router.post("/ingredientList",
  userController.isAuthorized,
  IngredientController.postIngredient
);

module.exports = router;