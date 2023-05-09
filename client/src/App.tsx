// import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import { store } from './store';
import './styles/index.scss'

const App = () => (
  <Provider store={store}>
    <Header/>
    <Outlet/>
  </Provider>
)

export default App
