import { useAuthCheck } from '../hooks/useAuthCheck';
import { Link } from 'react-router-dom';
import BaseLink, { BaseLinkProps } from "../components/base/Link"
import Cta from '../components/base/Cta'
import { useAppDispatch } from '../store';
import { signOutUser } from '../store/user/userSlice';
import { useState } from 'react';
import clsx from 'clsx';

const NavBar = ({ children }) => {
  // Make a context for the Mobile Menu Drawer Being open and close (is Making a Reducer neccessary?)
  return (
    <nav
      className='flex items-stretch gap-4'
      role="menu">
      {children}
    </nav>
  )
}

const Menu = ({ children }) => {
  return (
    <ul className="flex grow items-stetch justify-end gap-2 text-sm font-medium">
      { children }
    </ul>
  )
}

const MenuItem = ({ to, activeClass, children, ...props }: BaseLinkProps) => {
  return (
    <li className="hidden md:flex items-stretch">
      <BaseLink
        className={'flex items-center px-4 py-2 transition border-transparent hover:border-current border-b-2 hover:text-lightSecondary'}
        to={to}
        activeClass={activeClass}
      >
        {children}
      </BaseLink>
    </li>
  )
}

const MenuLogInButton = ({
  logInSRText = 'log in to account',
  logInText = 'Log In',
  logOutSRText = 'log out of account',
  logOutText = 'Log Out'
}) => {
  const isLoggedIn = useAuthCheck()
  const dispatch = useAppDispatch()
  const logout = (e) => {
    console.log(e);
    dispatch(signOutUser())
  }
  return (
    <ul
      className="flex grow-0 items-center text-sm font-medium">
      <li className="block">
        {/* use a base button / link component */}
        { isLoggedIn ? (
          <Cta
            color={'primary'}
            role="button"
            onClick={logout}>
            {logOutText}
            <span className='sr-only'>{logOutSRText}</span>
          </Cta>
        ) : (
          <Cta
            color={'primary'}
            to="/login"
            isLink
          >{logInText}
            <span className='sr-only'>{logInSRText}</span>
          </Cta>
        )}
      </li>
    </ul>
  )
}

const MobileNav = () => {

  const [mobileDrawerState, toggleMobileDrawer] = useState(false);
    // Add a Mobile Nav Drawer to this function
  const toggleDrawer = (val) => {
    if (typeof val !== undefined) {
      return toggleDrawer(val)
    }
    return toggleDrawer(!mobileDrawerState)
  }

  const mobileLogoutUser = () => {
    toggleMobileDrawer(false)
  }
  return (
    <div className='flex block md:hidden'>
      <ul className={clsx(mobileDrawerState ? "flex flex-wrap" : "hidden")}>
        <li className="block md:hidden">
          <BaseLink
            to="/inventory"
            activeClass="activeLink"
            onClick={toggleDrawer}>Inventory</BaseLink>
        </li>
        <li className="block md:hidden">
          <BaseLink
            to="/mealplanner"
            activeClass="activeLink"
            onClick={toggleDrawer}>Meal Planner</BaseLink>
        </li>
        <li className="block md:hidden">
          <BaseLink
            to="/recipes"
            activeClass="activeLink"
            onClick={toggleDrawer}>Recipes</BaseLink>
        </li>
        <li className="block md:hidden">
          <BaseLink to="/recipes" activeClass="activeLink"
            onClick={mobileLogoutUser}>Log Out</BaseLink>
        </li>
      </ul>
    </div>
  );
}

Menu.Item = MenuItem
NavBar.Menu = Menu
NavBar.LogInButton = MenuLogInButton
NavBar.MobileNav = MobileNav
export default NavBar