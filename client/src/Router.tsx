import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/index.ts';
import { getIngredientsThunk } from './store/ingredients/IngredientSlice.ts'
import { getUserRecipesThunk } from './store/recipes/recipeSlice.ts'
import { isEmpty } from 'lodash';

import App from './App.tsx';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx';
import InventoryPage from './pages/InventoryPage.js';
import SignUpPage from './pages/SignUpPage.jsx';
import AddIngredientFormPage from './pages/AddIngredientFormPage.jsx';
import AddRecipeFormPage from './pages/AddRecipeFormPage.jsx';
import AddRecipePage from './pages/AddRecipePage.jsx';
import MealPlanPage from './pages/MealPlanPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import GuardedOutlet from './pages/GuardedOutlet.tsx';

const AppRouter = (): JSX.Element => {
  const isAuth = useAppSelector<boolean>(state => {
		const user = state.user.user;
		const loggedIn = state.user.isLoggedIn;
		return !isEmpty(user) && loggedIn
	})
  // *NOTE: Had problems with the guarded route navigating logic using createBrowserRouter
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //   )
  // )
  // return <RouterProvider router={ router } />
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<App/>}
          errorElement={<ErrorPage />}>
          <Route
            path="/"
            element={
              <GuardedOutlet
                canAccess={isAuth}
                redirect='/login'
              />
            }
          >
            <Route
              path="/home"
              element={<HomePage/>}>
            </Route>
          </Route>
          <Route
            path="/login"
            element={<LoginPage/>}
            errorElement={<ErrorPage />}
            />
          <Route
            path={"/signup"}
            element={<SignUpPage/>}
          />

          <Route
            element={
              <GuardedOutlet
                canAccess={isAuth}
                redirect='/login'
              />
            }
          >
            {/* TODO: dispatch a fetch user inventory in loader prop? */}
            <Route
              path={"/inventory"}
              element={<InventoryPage/>}
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter