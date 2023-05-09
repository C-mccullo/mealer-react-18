
import React from "react";
import { Link } from "react-router-dom";
import MealerSVG from "../svgs/rice";

const HomePage = ({ loggedIn, ...props }) => {
  return (
    <div className="homeContainer">
      <div className="home">
        <MealerSVG className="homeImage"/>
        <h1 className="homeHeader">Welcome to Mealer!</h1>
        <h3 className="homeSubHeader">keep track of all your food and make meal plans quickly ;)</h3>
        { loggedIn ? (
          <div className="homeButtonsContainer">
            <Link
              aria-labelledby="button"
              to="/inventory"
              className="button button-blue">
              Go to your inventory
            </Link>
            <button
              className="button button-red"
              onClick={ () => props.logout() }
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="homeButtonsContainer">
            <Link
              aria-labelledby="button"
              to="/login"
              className="button button-blue"
            >
              Log In
            </Link>
            <Link
              aria-labelledby="button"
              to="/signup"
              className="button button-green"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;