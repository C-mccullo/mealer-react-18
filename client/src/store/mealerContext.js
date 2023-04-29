import React, { useReducer, createContext } from "react";

export const MealerContext = createContext();

const initialState = {
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
  currentUser: {
    // name: String
    // email: String
    // inventoryId: ID
    // mealPlanId : ID
    // recipes: []
  },
  loggedIn: false,
  modalOpen: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        contacts: [...state.contacts, action.payload]
      };
    case "DEL_CONTACT":
      return {
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "START":
      return {
        loading: true
      };
    case "COMPLETE":
      return {
        loading: false
      };
    default:
      throw new Error();
  }
};

export const ContactContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MealerContext.Provider value={[state, dispatch]}>
      {props.children}
    </MealerContext.Provider>
  );
};