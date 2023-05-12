import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'

import ingredientReducer from './ingredients/IngredientSlice';
import userReducer from './user/userSlice';
import recipeReducer from './recipes/recipeSlice';
import mealPlanReducer from './mealPlans/mealPlanSlice';
import inventoryReducer from './inventory/inventorySlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  inventory: inventoryReducer,
  user: userReducer,
  recipes: recipeReducer,
  mealPlan: mealPlanReducer
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
  // devTools: process.env.NODE_ENV !== 'production',
})

export const persistedStore = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;