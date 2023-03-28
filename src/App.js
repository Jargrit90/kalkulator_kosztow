import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from "./components/menu";
import Strona_glowna from "./components/main";
import Towary from "./components/towary";
import Statystyka from "./components/statystyka";

import './App.css';

function App() {
  let app = useSelector(state => state.app);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Menu />
      {app.active_page === "strona_glowna" ? <Strona_glowna /> : null}
      {app.active_page === "towary" ? <Towary /> : null}
      {app.active_page === "statystyka" ? <Statystyka /> : null}
    </div>
  );
}

export default App;
