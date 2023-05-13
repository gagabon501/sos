import { createContext, useReducer } from "react";

export const ObservationsContext = createContext();

export const observationsReducer = (state, action) => {
  switch (action.type) {
    case "SET_OBSERVATIONS":
      return {
        observations: action.payload,
      };
    case "CREATE_OBSERVATION":
      return {
        observations: [action.payload, ...state.observations],
      };
    case "DELETE_OBSERVATION":
      return {
        observations: state.observations.filter(
          (obs) => obs._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ObservationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(observationsReducer, {
    observations: null,
  });

  return (
    <ObservationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ObservationsContext.Provider>
  );
};
