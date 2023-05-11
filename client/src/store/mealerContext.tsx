import { useReducer, createContext } from "react";
import { MealerState, MealerReducerAction, MEALER_ACTION_TYPE } from '../types/index.types';

const initialState: MealerState = {
  // ingredientList: [],
  inventory: [],
  recipes: [
    // name: String,
    // ingredients: [{ ingredient, portionSize }]
  ],
  mealPlan: {
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

export const MealerContext = createContext({});

// USE CONTEXT TILL MORE COMPLEX STATE NEEDED
const mealerReducer = (state: MealerState, action: MealerReducerAction): MealerState => {
  switch (action.type) {
    case MEALER_ACTION_TYPE.GET_FOOD_ITEMS:
      return {
        ...state,
        inventory: action.payload
      }
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
      return {
        ...state
      }
  }
};

export const MealerContextProvider = (props) => {
  const [state, dispatch] = useReducer(mealerReducer, initialState);

  return (
    <MealerContext.Provider value={[state, dispatch]}>
      {props.children}
    </MealerContext.Provider>
  );
};