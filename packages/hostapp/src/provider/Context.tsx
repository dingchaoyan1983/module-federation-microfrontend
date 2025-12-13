import { createContext } from "react";
import { ContextProps } from "./interfaces";

export const Context = createContext<ContextProps>({
  test: "test",
});
