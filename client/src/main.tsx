import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { store, useAppSelector } from './store';
import { isEmpty } from 'lodash'

import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import AddIngredientPage from './pages/AddIngredientPage';
import SignUpPage from './pages/SignUpPage';
import AddIngredientFormPage from './pages/AddIngredientFormPage';
import AddRecipeFormPage from './pages/AddRecipeFormPage';
import AddRecipePage from './pages/AddRecipePage';
import MealPlanPage from './pages/MealPlanPage';
import ErrorPage from './pages/ErrorPage';
import GuardedRoute from './pages/GuardedRoute.tsx';

// import './index.css';

// TODO: move this hook inside App function with the rest of the router and store setup
// const isAuth = useAppSelector<boolean>(state => {
//   const user = state.user.user;
//   const loggedIn = state.user.isLoggedIn;
//   return !isEmpty(user) && loggedIn
// })

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

      <Route
        element={
          <GuardedRoute
            canAccess={false}
            redirect='/login'
          />
        }>
        {/* dispatch a fetch user inventory in loader prop */}
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
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>,
)
