
import React from "react";
import { Link } from "react-router-dom";
import RiceIcon from "../components/icons/RiceIcon";
import { signOutUser } from '../store/user/userSlice';
import { useAppDispatch, useAppSelector } from "../store";
const HomePage = () => {
  // const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const logout = useAppDispatch(signOutUser)

  return (
    <div className="homeContainer">
      <div className="home">
        <RiceIcon className="homeImage"/>
        <h1 className="homeHeader">Welcome to Mealer!</h1>
        <h3 className="homeSubHeader">keep track of all your food and make meal plans quickly ;)</h3>
        <div className="homeButtonsContainer">
          <Link
            aria-labelledby="button"
            to="/inventory"
            className="button button-blue">
            Go to your inventory
          </Link>
          <button
            className="button button-red"
            onClick={ logout }
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage;