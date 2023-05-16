import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store'
import { getUserInventoryThunk } from "../store/inventory/inventorySlice";
import InventoryList from "../components/InventoryList";
import { InventoryItem } from "../types/index.types";

const InventoryPage = ({ ...props }) => {

  const dispatch = useAppDispatch()
  const inventory = useAppSelector<InventoryItem[]>(state => state.inventory)

  useEffect(() => {
    console.log('dispatch the inventory call')
    dispatch(getUserInventoryThunk())
  }, [dispatch])

  return (
    <div>
      <InventoryList {...props} inventory={ inventory }/>
    </div>
  )
}

export default InventoryPage;