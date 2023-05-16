import { ReactNode } from 'react'
import AddRecipeForm from '../components/AddFoodForm';

const AddRecipeFormPage = (): JSX.Element => {
  return (
    <div>
      <div className="paleBackground-wrapper">
        <AddRecipeForm/>
      </div>
    </div>
  )
}

export default AddRecipeFormPage;