import { useState } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import BurgerMenuIcon from './icons/BurgerMenuIcon';
import clsx from 'clsx';

const Header = () => {
  const [isMobileOpen, setMobileOpenState ] = useState(false);


  const hamburgerToggleMenu = (e) => {
    e.preventDefault();
    setMobileOpenState(!isMobileOpen);
    console.log("menu state", isMobileOpen);
  }

  const logoutUser = () => {
    // dispatch the logout action
    // this.props.logout();
    // closeMobileMenu();
  }

  return (
    <header>
      <div className="mx-auto px-6 bg-night flex grow justify-between items-stretch text-sm font-medium text-white w-full">
        <div className='flex grow-0'>
          <Link
            className='block py-3'
            to="/">
            <p className="font-lobster text-white text-2xl font-bold text-gray-900 sm:text-3xl">Mealer</p>
          </Link>
        </div>
        <div className='flex grow justify-end items-stretch'>
          <NavBar>
            <NavBar.Menu>
              <NavBar.Menu.Item
                to="/inventory">
                <span>Inventory</span>
              </NavBar.Menu.Item>
              <NavBar.Menu.Item
                to="/inventory">
                <span>Inventory</span>
              </NavBar.Menu.Item>
              <NavBar.Menu.Item
                to="/mealplanner">
                <span>Meal Planner</span>
              </NavBar.Menu.Item>
              <NavBar.Menu.Item
                to="/recipes">
                <span>Recipes</span>
              </NavBar.Menu.Item>
            </NavBar.Menu>
            <NavBar.LogInButton/>
          </NavBar>
        </div>
      </div>
    </header>
  )
}

export default Header;