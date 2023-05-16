import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store'
import { useForm, Controller } from 'react-hook-form';
import { Ingredient } from '../types/index.types'
import BaseTypeAheadForm from './base/TypeAhead';

interface SearchRecipeFormState {
  mealType?: 'Breakfast' | 'Lunch' | 'Dinner';
  ingredients: Ingredient[];
  diet?: 'high-fiber' | 'high-protein' | 'low-carb' | 'low-fat' | 'low-sodium';
}

const SearchRecipeForm = () => {
  const initialFormState: SearchRecipeFormState = {
    mealType: undefined,
    diet: undefined,
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

  //

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">

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
                  labelKey='name'
                  valueKey='name'
                  isMulti
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

export default SearchRecipeForm;
