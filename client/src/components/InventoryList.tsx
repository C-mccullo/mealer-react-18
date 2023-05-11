import InventoryItem from "./InventoryItem";

const InventoryList = ({ inventory }) => {
  return (
    <div className="inventoryList">
      { inventory.map((item) => {
          return <InventoryItem key={item._id} item={item}/>
        })
      }
    </div>
  )
}

export default InventoryList;