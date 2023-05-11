import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store'
import { getUserInventoryThunk } from "../store/inventory/inventorySlice";
import { Link } from "react-router-dom";
import InventoryList from "../components/InventoryList";
import { InventoryItem } from "../types/index.types";

const InventoryPage = ({ ...props }) => {

  const dispatch = useAppDispatch()
  const inventory = useAppSelector<InventoryItem[]>(state => state.inventory)

  useEffect(() => {
    dispatch(getUserInventoryThunk)
  })

  return (
    <div>
      {/* ADD TYPEAHEAD */}
      <Link className="addFormLink" to="/inventory/addfood">Add Foods</Link>
      {/* <AddFoodForm fetchFoods={ props.fetchFoods }
        fetchIngredients={ props.fetchIngredients }
      /> */}
      <InventoryList {...props} inventory={ inventory }/>
    </div>
  )
}

export default InventoryPage;