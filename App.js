import React from "react";
import Main from "./Main";
import { GlobalStateProvider } from "./contexts/GlobalState";

export default function App() {
  return (
    <GlobalStateProvider>
      <Main />
    </GlobalStateProvider>
  );
}
