// import { Types } from 'mongoose';

// export interface MongoDB response

export interface InventoryItem {
  user?: string;
  ingredient: Ingredient;
  expiry: string | null;
  quantity: number;
  portions?: number;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface Ingredient {
  name: string;
  // TODO: enhance to store nutrient info?
  // caloriesPerUnit?: number;
  // fatPerUnit?: number;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  portionSize: number;
}

export interface Recipe {
  ingredients: RecipeIngredient[];
  user?: User;
  name: string;
}

export interface MealPlan {
  monday: Recipe[],
  tuesday: Recipe[],
  wednesday: Recipe[],
  thursday: Recipe[],
  friday: Recipe[],
  saturday: Recipe[],
  sunday: Recipe[]
}

export interface MealerState {
  // ingredientList: [],
  inventory?: InventoryItem[];
  recipes?: Recipe[];
  mealPlans?: MealPlan;
  currentUser?: User;
  isLoggedIn: boolean;
  isModalOpen: boolean;
}

// THIS WILL PROBABLY NEED TO BE REFACTORED LATER
export enum MEALER_ACTION_TYPE {
  // FOOD ITEMS
  GET_FOOD_ITEMS = 'GET_FOOD_ITEMS',
  ADD_FOOD_ITEM = 'ADD_FOOD_ITEM',
  DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM',
  // INVENTORY
  GET_INVENTORY = 'GET_INVENTORY',
  ADD_INVENTORY = 'ADD_INVENTORY',
  DELETE_INVENTORY = 'DELETE_INVENTORY',
  // MEAL PLANS
  GET_MEAL_PLANS = 'GET_MEAL_PLANS',
  ADD_MEAL_PLAN = 'ADD_MEAL_PLAN',
  DELETE_MEAL_PLAN = 'DELETE_MEAL_PLAN',
  // RECIPES
  GET_RECIPES = 'GET_RECIPES',
  ADD_RECIPE = 'ADD_RECIPE',
  DELETE_RECIPE = 'DELETE_RECIPE',
  // USER
  GET_USER = 'GET_USER',
  LOGOUT_USER = 'LOGOUT_USER'
}