import React, { useEffect, useState } from "react";
import InventoryItem from "./InventoryItem";

const InventoryList = ({ ...props }) => {

  // add a onClick handler to Inventory Item
  // make a function that checks if has "select" function prop
  // then run function onClick
  const [ inventory, setInventory ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/v1/ingredients', {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json();
      console.log('data: ', data);
      setInventory(data)
    }

    fetchData();
  }, [])

  // const { data: inventory } = useFetch('/api/v1/ingredients')
  return (
    <div className="inventoryList">
      { inventory.map((item) => {
          return (<InventoryItem key={item._id} item={item}/>)
        })
      }
    </div>
  )
}

export default InventoryList;