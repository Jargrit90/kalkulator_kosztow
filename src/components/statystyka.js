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
    const dispatch = useDispatch();
    let przychod = 0;
    let wydatek = 0;
    let dochod = 0;
    let radial_background = '';
    let colors = ["rgb(125, 32, 43)", "rgb(35, 129, 176)"];
    transakcje = app.transakcje.map((el) => {
        let data = new Date(el.date);
        
        let data_rok = data.getFullYear();
        let data_miesiac = data.getMonth() + 1;
        if(app.miesiac_transakcji === 0){
            if(data_rok === app.rok_transakcji){
                let transakcja = el.transactions.map(el2 => {
                    towary_arr[el2.index] += el2.count;
                    
                }); 
                przychod += parseInt(el.income);
                wydatek += parseInt(el.wydatek);
            }
        }
        else {
            if(data_miesiac === app.miesiac_transakcji && data_rok === app.rok_transakcji){
                let transakcja = el.transactions.map(el2 => {
                    towary_arr[el2.index] += el2.count;
                    
                }); 
                przychod += parseInt(el.income);
                wydatek += parseInt(el.wydatek);
            }
        }
        
        dochod = przychod - wydatek;
        let radial_1 = ((wydatek/przychod)*100).toFixed(2);
        let radial_2 = ((dochod/przychod)*100).toFixed(2);
        radial_background = "conic-gradient("+ colors[0] +"0%, "+ colors[0] +" "+ radial_1 +"%, "+ colors[1] +" "+ radial_1 +"%, "+ colors[1] +" 100%)";
    });
    let dane = towary_arr.map((el2, index) => <div key={index} className="statystyka_towaru">
        <div className="nazwa_towaru_s flexCC">{app.towary[index].name}</div>
        <div className="ilosc_towaru_s flexCC">{el2}{app.towary[index].jednostka}</div>
    </div>);
    let setMiesiac = (value)=>{
        dispatch({type: 'change_state', payload: {name: 'miesiac_transakcji', value: value}});
    }
    let setRok = (value)=>{
        dispatch({type: 'change_state', payload: {name: 'rok_transakcji', value: value}});
    }
    let style = {
        backgroundImage: radial_background
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
            <div className="dane_statystyczne flexCC">
                {transakcje}
                {dane}
                <div className="rozliczenie">
                    <div className="przychod">Twoje przychody wyniosły: <span className="przychod_wartosc statystyka_wartosc">{przychod}</span> zł</div>
                    <div className="wydatek">Twoje wydatki wyniosły: <span className="wydatek_wartosc statystyka_wartosc">{wydatek}</span> zł</div>
                    <div className="dochod">Twój dochód wyniósł: <span className="dochod_wartosc statystyka_wartosc">{dochod}</span> zł</div>
                </div>
                <div className="rozliczenie_diagram_1 flexCC">
                    <div className="diagram_kolory flexCC">
                        <div className="rozliczenie_dane flexCC">Dochód: <div className="square square_2"></div></div>
                        <div className="rozliczenie_dane flexCC">Wydatki: <div className="square square_1"></div></div>
                    </div>
                    <div className="diagram_1" style={style}>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Statystyka;