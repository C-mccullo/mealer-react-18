import React from "react";
import { redirect, Link } from "react-router-dom";
import InventoryList from "../components/InventoryList";
// 👉 NOT IN USE YET
const AddIngredientPage = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return (
      <div>
        {/* ADD TYPEAHEAD */}
        <Link className="addFormLink" to="/inventory/addfood">Add Foods</Link>
        {/* <AddFoodForm fetchFoods={ props.fetchFoods }
          fetchIngredients={ props.fetchIngredients }
        /> */}
        <InventoryList
          inventory={ props.inventory }
          deleteFood ={ props.deleteFood }
          fetchFoods={ props.fetchFoods }
          fetchIngredients={ props.fetchIngredients }/>
      </div>
    )
  }
  return redirect('/login');
}

export default AddIngredientPage;