import { ObservationsContext } from "../context/ObservationsContext";
import { useContext } from "react";

export const useObservationsContext = () => {
  const context = useContext(ObservationsContext);

  if (!context) {
    throw Error("Context must be used inside a ContextProvider");
  }

  return context;
};
