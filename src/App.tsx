import React from "react";
import "./scss/App.css";
import { Info } from "./components/info";
import { Center } from "./components/center";
import { About } from "./components/about";
import { Menu } from "./components/menu";

function App() {
  return (
    <div className='App'>
      <Menu />
      <Info />
      <About />
      <Center />
    </div>
  );
}

export default App;
