import InventoryItem from "./InventoryItem";

// TODO: create a factory component to dynamically list children
const InventoryList = ({ inventory, ...props }) => {
  return (
    <div className="inventoryList">
      { inventory.map((item) => {
          return (<InventoryItem {...props} key={item._id} item={item}/>)
        })
      }
    </div>
  )
}

export default InventoryList;