
import { Router } from 'express';
import IngredientController from "../controllers/ingredientController";
import userController from '../controllers/userController';

const router = Router();

router.get("/api/ingredientList", IngredientController.getIngredients);

router.get("/api/search/ingredientList", IngredientController.searchIngredients);

router.post("/api/ingredientList",
  userController.isAuthorized,
  IngredientController.postIngredient
);

module.exports = router;