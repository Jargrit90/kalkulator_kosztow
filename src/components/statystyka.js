import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../App.css';
import './statystyka.css';

import * as f from './functions';
let towary_length;
let towary_arr;
let count_arr;
let transakcje;
function Statystyka(){
    let app = useSelector(state => state.app);
    let dane_transakcji;
    towary_length = app.towary.length;
    towary_arr = new Array(parseInt(towary_length)).fill(0);
    console.log(towary_arr);
    const dispatch = useDispatch();
    transakcje = app.transakcje.map((el) => {
        let data = new Date(el.date);
        
        let data_rok = data.getFullYear();
        let data_miesiac = data.getMonth() + 1;
        
        if(data_miesiac === app.miesiac_transakcji && data_rok === app.rok_transakcji){
            let transakcja = el.transactions.map(el2 => {
                towary_arr[el2.index] += el2.count;
            }); 
            console.log(towary_arr);
            
        }
        
    });
    let dane = towary_arr.map((el2, index) => <div className="flexCC">
        <div>Nazwa towaru: {app.towary[index].name}</div>
        <div>Ilość w {app.towary[index].jednostka}: {el2}</div>
    </div>);
    let setMiesiac = (value)=>{
        dispatch({type: 'change_state', payload: {name: 'miesiac_transakcji', value: value}});
    }
    let setRok = (value)=>{
        dispatch({type: 'change_state', payload: {name: 'rok_transakcji', value: value}});
    }
    return (
        <>
            <div className="page_title">Twoje statystyki</div>
            <div className="set_date flexCC">
                <div>Wybierz miesiąc:
                    <select className="miesiac_transakcji" onChange={(event)=>{
                        setMiesiac(parseInt(event.target.value));
                    }}>
                        <option value={0}>Wszytkie</option>
                        <option value={1}>Styczeń</option>
                        <option value={2}>Luty</option>
                        <option value={3}>Marzec</option>
                        <option value={4}>Kwiecień</option>
                        <option value={5}>Maj</option>
                        <option value={6}>Czerwiec</option>
                        <option value={7}>Lipiec</option>
                        <option value={8}>Sierpień</option>
                        <option value={9}>Wrzesień</option>
                        <option value={10}>Październik</option>
                        <option value={11}>Listopad</option>
                        <option value={12}>Grudzień</option>
                    </select>
                </div>
                <div>Podaj rok:
                    <input type="number" className="rok_transakcji" onChange={(event)=>{
                        setRok(parseInt(event.target.value));
                    }}/>
                </div>
            </div>
            <div className="dane_statystyczne">
                {transakcje}
                {dane}
            </div>
        </>
    )
}
export default Statystyka;