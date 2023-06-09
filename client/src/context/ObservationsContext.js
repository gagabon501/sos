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
    case "UPDATE_OBSERVATION":
      return {
        observations: [...state.observations],
      };
    case "CLOSE_OBSERVATION":
      return {
        observations: [...state.observations],
      };
    case "DELETE_OBSERVATION":
      return {
        observations: state.observations.filter(
          (obs) => obs._id !== action.payload._id
        ),
      };
    case "SET_USERS":
      return {
        usersList: action.payload,
      };
    case "CREATE_USER":
      return {
        usersList: [action.payload, ...state.usersList],
      };
    case "DELETE_USER":
      return {
        usersList: state.usersList.filter(
          (obs) => obs._id !== action.payload._id
        ),
      };
    case "UPDATE_USER":
      // return {
      //   usersList: state.usersList.filter(
      //     (obs) => obs._id !== action.payload._id
      //   ),
      // };
      return { usersList: [...state.usersList] };
    case "SET_COMPANIES":
      return {
        companies: action.payload,
      };
    case "CREATE_COMPANY":
      return {
        companies: [action.payload, ...state.companies],
      };
    case "UPDATE_COMPANY":
      // return {
      //   companies: (state.companies[
      //     state.companies.indexOf(action.payload.id)
      //   ] = action.payload),
      // };
      return { companies: [...state.companies] };
    case "DELETE_COMPANY":
      return {
        companies: state.companies.filter(
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
