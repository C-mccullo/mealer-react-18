import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './store';
import { getIngredientsThunk } from './store/ingredients/IngredientSlice';
import Header from './components/Header';
import './styles/index.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// Get Ingredients right off the bat on load of app (this logic should live outside of this component)
const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngredientsThunk())
  }, [dispatch])

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}


export default App
