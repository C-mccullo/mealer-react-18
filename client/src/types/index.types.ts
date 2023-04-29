// import { Types } from 'mongoose';

export interface FoodItem {
  user?: User;
  ingredient: string;
  expiry: string;
  quantity: number;
  portions: number;
}

export interface User {
  email: string;
  name: string;
}

export interface Ingredient {
  name: string;
  // TODO: enhance to store nutrient info
  // caloriesPerUnit?: number;
  // fatPerUnit?: number;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  portionSize: number;
}

export interface Recipe {
  ingredients: RecipeIngredient[];
  user: User;
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
  inventory: FoodItem[];
  recipes: Recipe[];
  weekMealPlan: MealPlan;
  currentUser?: User;
  isLoggedIn: boolean;
  isModalOpen: boolean;
}

export enum MEALER_ACTION_TYPE {
  ADD_FOOD_ITEM = 'ADD_FOOD_ITEM',
  DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM',
  ADD_MEAL_PLAN = 'ADD_MEAL_PLAN',
  DELETE_MEAL_PLAN = 'DELETE_MEAL_PLAN'
}

export type MealerReducerAction = {
  type: MEALER_ACTION_TYPE;
  payload: any;
}