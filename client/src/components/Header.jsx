import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import BaseLink from './base/Link';
import BurgerMenuIcon from './icons/BurgerMenuIcon';
import RiceIcon from './icons/RiceIcon';

const Header = () => {
  const [isHamburgerOpen, setHamburgerOpen ] = useState(false);

  const hamburgerToggleMenu = (e) => {
    e.preventDefault();
    setHamburgerOpen(!isHamburgerOpen);
    console.log("menu state", this.state);
  }

  const logoutUser = () => {
    // dispatch the logout action
    // this.props.logout();
    this.closeMobileMenu();
  }

  const closeMobileMenu = () => {
    setHamburgerOpen({ hamburgerOpen: false });
    console.log("close the menu")
  }

  const RenderNavBar = () => (
    <div>
      <Link to="/">
        <h2 className="app-logo">Mealer</h2>
      </Link>
      <div className="navBar-menu_wide">
        <ul className="navBar-list">
          <li className="navBar-link">
            <BaseLink to="/inventory" activeclassname="activeLink">Inventory</BaseLink>
          </li>
          <li className="navBar-link">
            <BaseLink to="/meals" activeclassname="activeLink">Meal Planner</BaseLink>
          </li>
          <li className="navBar-link">
            <BaseLink to="/recipes" activeclassname="activeLink">Recipes</BaseLink>
          </li>
        </ul>
        <ul className="navBar-list navBar-list_right">
          {/* <li className="navBar-link">
            { (mealerContext.currentUser && mealerContext.currentUser.name)
              ?? <span>Welcome, {mealerContext.currentUser}</span>
            }
          </li> */}
          <li className="navBar-link">
            <a role="button" className="navBar-logout"
              onClick={() => logoutUser()}
            >Log Out</a>
          </li>
        </ul>
      </div>
      <div className="navBar-menu_mobile">
        <div className="hamburgerMenu-icon_wrapper">
          <a className="hamburgerMenu-link"
            onClick={(e) => hamburgerToggleMenu(e)}>
            <BurgerMenuIcon className="hamburgerMenu-icon" />
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <header className="header">
      <nav className="navBar">
        <RenderNavBar/>
        {/* THIS IS ALL MOBILE NAVBAR */}
        <ul className={isHamburgerOpen ? "navBar-list_mobile open" : "navBar-list_mobile"}>
          <li className="navBar-link_mobile">
            <BaseLink to="/inventory" activeclassname="activeLink"
              onClick={() => closeMobileMenu()}>Inventory</BaseLink>
          </li>
          <li className="navBar-link_mobile">
            <BaseLink to="/mealplanner" activeclassname="activeLink"
              onClick={() => closeMobileMenu()}>Meal Planner</BaseLink>
          </li>
          <li className="navBar-link_mobile">
            <BaseLink to="/recipes" activeclassname="activeLink"
              onClick={() => closeMobileMenu()}>Recipes</BaseLink>
          </li>
          <li className="navBar-link_mobile">
            <BaseLink to="/recipes" activeclassname="activeLink"
              onClick={() => logoutUser()}>Log Out</BaseLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;