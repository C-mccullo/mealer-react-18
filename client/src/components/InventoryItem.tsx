import React, { useEffect } from "react";

const InventoryItem = ({ item, ...props }) => {

  const deleteFood = (id) => {
    // dispatch the delete food action
  }
  const ingredient = item.ingredient
  useEffect(() => {
    console.log('item: ', item)
  })

  return (
    <div className="inventoryItem" key={`recipe-${item._id}`}>
      <div className="inventoryItem-header">
        <h3 className="inventoryItem-name">{ingredient.name}</h3>
        <span className="inventoryItem-quantity">{item.quantity}</span>
      </div>
      { item.expiry
          && <p className="inventoryItem-expiry"> {"Expires: " + item.expiry}</p>
      }

      <span className="deleteItem" onClick={() => deleteFood(item._id)}> X </span>
    </div>
  )
}

export default InventoryItem;