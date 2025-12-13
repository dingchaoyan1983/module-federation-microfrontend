import { useContext } from "react";
import { Context } from "./Context";

export const useTest = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context
}
