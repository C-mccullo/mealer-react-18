import React from "react";
import { Link } from "react-router-dom";
import AddFoodForm from "../components/AddFoodForm";
import InventoryList from "../components/InventoryList";

const AddIngredientPage = (props) => {
  return (
    <div>
      <Link disabled className="addFormLink" to="/inventory/addfood">Add Foods</Link>
      <div className="paleBackground-wrapper">
        <AddFoodForm
          fetchFoods={ props.fetchFoods }
          fetchIngredients={ props.fetchIngredients }
        />
      </div>
        <InventoryList/>
    </div>
  )
}

export default AddIngredientPage;