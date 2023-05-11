import React from "react";

const InventoryItem = ({ item, ...props }) => {

  const deleteFood = (id) => {
    // dispatch the delete food action
  }

  return (
    <div className="inventoryItem" key={`recipe-${item._id}`}>
      <div className="inventoryItem-header">
        <h3 className="inventoryItem-name">{item.name}</h3>
        {/* <span className="inventoryItem-quantity">{item.quantity}</span> */}
      </div>
      {/* <p className="inventoryItem-expiry"> { item.expiry ? "Expires: " + item.expiry : "" }</p> */}
      <span className="deleteItem" onClick={() => deleteFood(item._id)}> X </span>
    </div>
  )
}

export default InventoryItem;