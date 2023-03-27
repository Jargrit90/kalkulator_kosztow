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
            
        </div>
        </>
    )
}
export default Menu;