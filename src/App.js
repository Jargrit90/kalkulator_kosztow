import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from "./components/menu";

import './App.css';

function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
