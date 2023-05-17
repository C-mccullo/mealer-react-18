import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './store';
import { getIngredientsThunk } from './store/ingredients/IngredientSlice';
import Header from './components/Header';
import Footer from './components/Footer';
// import './styles/index.scss';

// Get Ingredients right off the bat on load of app (this logic should live outside of this component)
const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngredientsThunk())
  }, [dispatch])

  return (
    <>
      <Header/>
      <main className='bg-bone min-h-[calc(100vh-60px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}


export default App
