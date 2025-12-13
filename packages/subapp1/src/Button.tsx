import React from "react";
import {
  useTest,
} from "hostApp/HostProvider";

export const Button = () => {
  const test = useTest();
  return (
    <button onClick={() => test?.setTest?.("hello hostapp")}>Set Test</button>
  )
}
