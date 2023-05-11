import React from "react";
import { redirect, Link } from "react-router-dom";
import AddFoodForm from "../components/AddFoodForm";
import InventoryList from "../components/InventoryList";

const AddIngredientPage = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return (
      <div>
        <Link disabled className="addFormLink" to="/inventory/addfood">Add Foods</Link>
        <div className="paleBackground-wrapper">
          <AddFoodForm fetchFoods={ props.fetchFoods }
            fetchIngredients={ props.fetchIngredients }
          />
        </div>
          <InventoryList
            // all these props should be coming from a store / context
            inventory={props.inventory}
            deleteFood={props.deleteFood}
            fetchFoods={props.fetchFoods}
            fetchIngredients={props.fetchIngredients}
          />
      </div>
    )
  }
  return redirect('/login');
}

export default AddIngredientPage;