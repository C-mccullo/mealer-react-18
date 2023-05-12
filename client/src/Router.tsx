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
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import SignUpPage from './pages/SignUpPage';
import AddIngredientFormPage from './pages/AddIngredientFormPage';
import AddRecipeFormPage from './pages/AddRecipeFormPage';
import RecipePage from './pages/RecipePage.jsx';
import MealPlanPage from './pages/MealPlanPage';
import ErrorPage from './pages/ErrorPage';
import GuardedOutlet from './pages/GuardedOutlet';

const AppRouter = (): JSX.Element => {
  const isAuth = useAppSelector<boolean>(state => {
		const user = state.user.user;
		const loggedIn = state.user.isLoggedIn;
		return !isEmpty(user) && loggedIn
	})
  /*
    *NOTE: Had problems with the guarded route navigating logic using createBrowserRouter
    https://github.com/remix-run/react-router/discussions/9856
  */
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //   )
  // )
  // return <RouterProvider router={ router } />
  // TODO: maybe find way to use Route loader to make dispatch call to get data related to route?
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<App/>}
          errorElement={<ErrorPage />}>
          {/* Homepage guarded */}
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
              element={<HomePage/>}
            />
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
            <Route
              path={"/inventory"}
              element={<InventoryPage/>}
            />
            <Route
              path={"/recipes"}
              element={<RecipePage/>}
            />
            <Route
              path={"/recipes/addrecipe"}
              element={<AddRecipeFormPage/>}
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