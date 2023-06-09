import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../App.css';
import './menu.css';

function Menu(){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    return (
        <>
        <div className="menu_box flexCC">
            <div className="menu_btn" onClick={()=>dispatch({type: 'active_page', payload: 'strona_glowna'})}>Strona główna</div>
            <div className="menu_btn" onClick={()=>dispatch({type: 'active_page', payload: 'towary'})}>Towary</div>
            <div className="menu_btn" onClick={()=>dispatch({type: 'active_page', payload: 'statystyka'})}>Statystyki</div>
        </div>
        </>
    )
}
export default Menu;