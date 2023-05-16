import AddFoodForm from "../components/AddFoodForm";


const AddIngredientPage = (props): JSX.Element => {
  return (
    <div>
      <div className="paleBackground-wrapper">
        <AddFoodForm
          fetchFoods={ props.fetchFoods }
          fetchIngredients={ props.fetchIngredients }
        />
      </div>
    </div>
  )
}

export default AddIngredientPage;