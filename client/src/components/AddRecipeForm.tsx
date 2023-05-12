import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store'
import { useForm, Controller } from 'react-hook-form';
import { Ingredient } from '../types/index.types'
import BaseTypeAheadForm from './base/TypeAhead';

interface AddRecipeFormState {
  name: string;
  ingredients: Ingredient[]
}

const AddRecipeForm = () => {
  const initialFormState: AddRecipeFormState = {
    name: "",
    ingredients: [],
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues: initialFormState})

  const ingredients = useAppSelector<Ingredient[]>(state => state.ingredients)

  const onSubmit = (formData) => {
    console.log('add reciped form data: ', formData);
    // make form submit handler
  }

  // Form will be its own route as not to have cluttered the UX
  // Input for the Recipe Name (do a check against the existing user recipes to make sure its not already taken)
  // A Type Ahead to get the ingredients from list of ingredients to add to the recipe
  // LATER: -> a list with incrementers beside each Ingredient added to increase the volume of an ingredient added to each recipe

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <input
          className="form-input"
          {...register('name')}
          required
          type="text"
          placeholder="Enter Recipe Name"
        />
        <ul className="recipe-Ingredients">
          {/* Show ingredients added via typeahead here? */}
        </ul>
        <div className="ingredientList">
          <Controller
            control={control}
            name="ingredients"
            render={({
              field: {
                ref,
                onChange,
                name
              },
              fieldState
            }) => (
              <>
                <BaseTypeAheadForm
                  name={name}
                  onChange={onChange}
                  id="recipeFormTypeAhead"
                  inputRef={ref}
                  labelKey="name"
                  multiple
                  clearButton
                  className={fieldState.invalid && "is-invalid"}
                  aria-describedby="typeaheadError"
                  options={ingredients}
                />
                <p id="typeaheadError" className="invalid-feedback">
                  {fieldState.error?.message}
                </p>
              </>
            )}
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit">Finish Recipe</button>
      </div>
    </form>
  )
}

export default AddRecipeForm;
