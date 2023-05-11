// import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './styles/index.scss'

const App = () => (
  <>
    <Header/>
    <Outlet/>
  </>
)

export default App
