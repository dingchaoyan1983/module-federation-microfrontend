import React from "react";
import { Context } from "./Context";
import {
  useState
} from "react";
export { useTest } from "./hooks";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [test, setTest] = useState("");

  const setTestVal = (val: string) => {
    setTest(val);
  }

  return (
    <Context.Provider value={{
      test,
      setTest: setTestVal,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider;