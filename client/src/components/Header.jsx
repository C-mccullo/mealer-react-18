import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import BurgerMenuIcon from '../icons/BurgerMenu';

class Header extends Component {
  constructor(props) {
    super(props)
    this.hamburgerToggleMenu = this.hamburgerToggleMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.state = {
      hamburgerOpen: false
    }
  }

  hamburgerToggleMenu(e) {
    e.preventDefault();
    this.setState({ hamburgerOpen: !this.state.hamburgerOpen });
    console.log("menu state", this.state);
  }

  mobileLogout() {
    this.props.logout();
    this.closeMobileMenu();
  }

  closeMobileMenu() {
    this.setState({ hamburgerOpen: false });
    console.log("close the menu")
  }

  renderNavBar() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to="/">
            <h2 className="app-logo">Mealer</h2>
          </Link>
          <div className="navBar-menu_wide">
            <ul className="navBar-list">
              <li className="navBar-link">
                <NavLink to="/inventory" activeClassName="activeLink">Inventory</NavLink>
              </li>
              <li className="navBar-link">
                <NavLink to="/mealplanner" activeClassName="activeLink">Meal Planner</NavLink>
              </li>
              <li className="navBar-link">
                <NavLink to="/recipes" activeClassName="activeLink">Recipes</NavLink>
              </li>
            </ul>
            <ul className="navBar-list navBar-list_right">
              <li className="navBar-link">
                <span>Welcome, {this.props.currentUser.name}</span>
              </li>
              <li className="navBar-link">
                <a role="button" className="navBar-logout"
                  onClick={() => this.props.logout(this.props.history)}
                >Log Out</a>
              </li>
            </ul>
          </div>
          <div className="navBar-menu_mobile">
            <div className="hamburgerMenu-icon_wrapper">
              <a className="hamburgerMenu-link"
                onClick={(e) => this.hamburgerToggleMenu(e)}>
                <BurgerMenuIcon className="hamburgerMenu-icon" />
              </a>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/">
            <h2 className="app-logo">Mealer</h2>
          </Link>
          <ul className="navBar-list navBar-list_right">
            <li className="navBar-link">
              <NavLink className="navBar-login" to="/login">Log In</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink className="navBar-signup" to="/signup">Signup</NavLink>
            </li>
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <header className="header">
        <nav className="navBar">
          {this.renderNavBar()}
          <ul className={this.state.hamburgerOpen ? "navBar-list_mobile open" : "navBar-list_mobile"}>
            <li className="navBar-link_mobile">
              <NavLink to="/inventory" activeClassName="activeLink"
                onClick={() => this.closeMobileMenu()}>Inventory</NavLink>
            </li>
            <li className="navBar-link_mobile">
              <NavLink to="/mealplanner" activeClassName="activeLink"
                onClick={() => this.closeMobileMenu()}>Meal Planner</NavLink>
            </li>
            <li className="navBar-link_mobile">
              <NavLink to="/recipes" activeClassName="activeLink"
                onClick={() => this.closeMobileMenu()}>Recipes</NavLink>
            </li>
            <li className="navBar-link_mobile">
              <NavLink to="/recipes" activeClassName="activeLink"
                onClick={() => this.mobileLogout()}>Log Out</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;