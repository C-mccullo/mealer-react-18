import { useReducer, createContext } from "react";
import { MealerState, MealerReducerAction, MEALER_ACTION_TYPE } from '../types/index.types';
export const MealerContext = createContext({});

const initialState: MealerState = {
  // ingredientList: [],
  inventory: [
    // name: String
    // quantity: Number
  ],
  recipes: [
    // name: String,
    // ingredients: [{ ingredient, portionSize }]
  ],
  weekMealPlan: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  currentUser: undefined,
  isLoggedIn: false,
  isModalOpen: false
}
// USE CONTEXT TILL MORE COMPLEX STATE NEEDED
const reducer = (state: MealerState, action: MealerReducerAction): MealerState => {
  switch (action.type) {
    case MEALER_ACTION_TYPE.ADD_FOOD_ITEM:
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case MEALER_ACTION_TYPE.DELETE_FOOD_ITEM:
      return {
        ...state,
        inventory: state.inventory.filter(
          foodItem => foodItem.ingredient !== action.payload
        )
      };
    case MEALER_ACTION_TYPE.ADD_MEAL_PLAN:
      return {
        ...state,
        // mealPlan: state.weekMealPlan
      };
    case MEALER_ACTION_TYPE.DELETE_MEAL_PLAN:
      return {
        ...state
      };
    default:
      throw new Error();
  }
};

export const MealerContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MealerContext.Provider value={[state, dispatch]}>
      {props.children}
    </MealerContext.Provider>
  );
};