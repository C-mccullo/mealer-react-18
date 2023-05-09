import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import AddIngredientPage from './pages/AddIngredientPage';
import SignUpPage from './pages/SignUpPage';
import AddIngredientFormPage from './pages/AddIngredientFormPage';
import AddRecipeFormPage from './pages/AddRecipeFormPage';
import AddRecipePage from './pages/AddRecipePage';
import MealPlanPage from './pages/MealPlanPage';
import ErrorPage from './pages/ErrorPage';
import GuardedRoute from './pages/RouteGuard.tsx';

// import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App/>}
      errorElement={<ErrorPage />}>
      <Route
        path="/login"
        element={<LoginPage/>}
        errorElement={<ErrorPage />}
        />

      <Route element={<GuardedRoute/>}>
        <Route
          path={"/inventory"}
          element={<AddIngredientPage/>}
        />
        <Route
          path={"/inventory/add-food"}
          element={<AddIngredientFormPage/>}
        />
        <Route
          path={"/recipes/addrecipe"}
          element={<AddRecipeFormPage/>}
        />
        <Route
          path={"/recipes"}
          element={<AddRecipePage/>}
        />
        <Route
          path={"/mealplanner"}
          element={<MealPlanPage/>}
        />
      </Route>
      <Route
        path={"/signup"}
        element={<SignUpPage/>}
      />
    </Route>
  )
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
