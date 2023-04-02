import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import '../App.css';
import './main.css';
import './transakcja.css';
import * as f from './functions';

function Strona_glowna(){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(()=>{
        let towary = localStorage.getItem("towary");
        let transakcje = localStorage.getItem("transakcje");
        let json = JSON.parse(towary);
        let json2 = JSON.parse(transakcje);
        if(json === null){
            json = [];
        }
        if(json2 === null){
            json2 = [];
        }
        dispatch({type: 'change_state', payload: {name: 'towary', value: json}});
        dispatch({type: 'change_state', payload: {name: 'transakcje', value: json2}});
    },[]);
    let transakcje = app.transakcje.map((el, index) => <Transakcja key={index} index={index} el={el}/>);
    return (
        <>
            <div className="strona_glowna_box">
                <div className="flexCC">
                    <div className="dodaj_transakcje_btn flexCC" onClick={()=>dispatch({type: 'change_state', payload: {name: 'dodaj_transakcje', value: true}})}>Dodaj transakcję</div>
                </div>
                {app.dodaj_transakcje ? <DodajTransakcje /> : null}
                <div className="wypis_transakcji flexCC">
                    {transakcje}
                </div>
            </div>
        </>
    )
}

function Transakcja(props){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    let transactions = props.el.transactions.map((el, index) => 
        <div className="transakcje flexCC" key={index}>
            <div className="dane_towaru nazwa_towaru">{app.towary[el.index].name}</div>
            <div className="dane_towaru jednostka_towarowa">{app.towary[el.index].jednostka}</div>
            <div className="dane_towaru ilosc_towaru">{el.count}</div>
            <div className="dane_towaru cena_towaru">{app.towary[el.index].zlote} zł {app.towary[el.index].grosze} gr</div>
        </div>
    );
    return (
        <>
            <div className="transakcja_box">
                <div className="data_transakcji">{props.el.date}</div>
                <div className="pozycje_transakcji">
                    <div className="transakcje_tabela flexCC">
                        <div>Nazwa towaru</div>
                        <div>Jednostka towarowa</div>
                        <div>Ilość towaru</div>
                        <div>Cena jednostkowa</div>
                    </div>
                    {transactions}
                </div>
                <div className="dane_transakcji flexCC">
                    <div className="dane_transakcji_desc">Przychód: {props.el.income} zł</div>
                    <div className="dane_transakcji_desc">Wydatki: {props.el.wydatek} zł</div>
                    <div className="dane_transakcji_desc">Dochód: {(parseFloat(props.el.income) - parseFloat(props.el.wydatek)).toFixed(2)} zł</div>
                </div>
                <div className="transakcja_btns flexCC">
                    <div className="transakcja_btn">Edytuj transakcję</div>
                    <div className="transakcja_btn">Usuń transakcję</div>
                </div>
            </div>
        </>
    )
}

let array_index = 0;


function DodajTransakcje(){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    
    
    let dodaj_towar = ()=>{
        let towary = [...app.towary_temporary_array];
        towary.push({array_index: array_index, index: 0, count: 0});
        dispatch({type: 'change_state', payload: {name: 'towary_temporary_array', value: towary}});
        array_index += 1;
    }
    let towary_temp_clear = ()=>{
        let towary = [...app.towary_temporary_array];
        towary = new Array(0);
        array_index = 0;
        dispatch({type: 'change_state', payload: {name: 'towary_temporary_array', value: towary}});
    }
    let wydatek = ()=>{
        let towary = [...app.towary_temporary_array];
        let wydatek = 0;
        for(let i = 0; i < towary.length; i++){
            wydatek += app.towary_temporary_array[i].count * (parseInt(app.towary[app.towary_temporary_array[i].index].zlote)+(parseInt(app.towary[app.towary_temporary_array[i].index].grosze)/100));
        }
        dispatch({type: 'change_state', payload: {name: 'temp_wydatek', value: wydatek}});
    }

    let zapisz_transakcje = ()=>{
        let date = new Date(app.temp_date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let date_str = year + "-" + month + "-" + day;
        let obj = {
            date: date_str,
            transactions: app.towary_temporary_array,
            income: parseFloat(app.temp_przychod),
            wydatek: parseFloat(app.temp_wydatek)
        }
        let transakcje = [...app.transakcje];
        transakcje.push(obj);
        console.log(transakcje);
        dispatch({type:'change_state', payload: {name:'transakcje', value: transakcje}});
        let json = JSON.stringify(transakcje)
        localStorage.setItem('transakcje', json);
    }

    useEffect(()=>{
        wydatek();
    },[app.towary_temporary_array]);
    useEffect(()=>{
        towary_temp_clear();
        array_index = 0;
    },[]);
    useEffect(()=>{
        let przychod = app.temp_przychod;
        let wydatek = app.temp_wydatek;
        let roznica = przychod - wydatek;
        dispatch({type: 'change_state', payload: {name: 'temp_dochod', value: roznica}});
    },[app.temp_przychod, app.temp_wydatek]);
    let towary = app.towary_temporary_array.map(el => <Towar id={el.array_index} key={el.array_index}/>);
    return (
        <>
            <div className="dodaj_transakcje_box">
                <div className="close" onClick={()=>dispatch({type: 'change_state', payload: {name: 'dodaj_transakcje', value: false}})}>X</div>
                <div className="flexCC">
                    <div className="dodaj_transakcje_btn flexCC" onClick={()=>dodaj_towar()}>Dodaj towar</div>
                </div>
                <div className="flexCC">
                   Podaj datę transakcji: <input type="date" required onChange={(event)=>{
                    dispatch({type: 'change_state', payload: {name: 'temp_date', value: event.target.value}});
                }}/>
                </div>

                {towary}
                <div className="flexCC wydatek">Wydatek: {app.temp_wydatek.toFixed(2)}</div>
                <div className="flexCC">Podaj przychód: <input type="number" min={0} onChange={(event)=>{
                    dispatch({type: 'change_state', payload: {name: 'temp_przychod', value: event.target.value}});
                }}/></div>
                <div className="flexCC przychod">Twój przychód wynosi: {app.temp_dochod.toFixed(2)} </div>
                <div className="flexCC zapisz"><span onClick={()=>{zapisz_transakcje(); dispatch({type: 'change_state', payload: {name: 'dodaj_transakcje', value: false}});}}>Zapisz transakcję</span></div>
            </div>
        </>
    )
}
function Towar(props){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    let towar = app.towary.map((el, index) => <option key={index++}>{el.name}</option>);

    return (
        <>
            <div className="flexCC towar_data_box">
                <div className="flexCC">
                    <div>Wybierz towar: </div>
                    <select name="towary" className="towar_data" onChange={(event)=>{
                        let index = event.target.selectedIndex;
                        let towary_temporary_array = [...app.towary_temporary_array];
                        towary_temporary_array[props.id].index = index;
                        dispatch({type: 'change_state', payload: {name: 'towary_temporary_array', value: towary_temporary_array}});
                    }}>
                        {towar}
                    </select>
                </div>
                <div className="jednostka_towarowa">
                    Jednostka: <b>{app.towary[app.towary_temporary_array[props.id].index].jednostka}</b>
                    
                </div>
                <div className="cena_towaru">
                    Cena towaru: <b>{app.towary[app.towary_temporary_array[props.id].index].zlote} zł {app.towary[app.towary_temporary_array[props.id].index].grosze} gr</b>
                </div>
                <div className="ilosc_towaru">
                    Podaj ilość towaru: <input type="number" min={0} max={1000} required onChange={(event)=>{
                        let count = event.target.value;
                        let towary_temporary_array = [...app.towary_temporary_array];
                        towary_temporary_array[props.id].count = parseInt(count);
                        dispatch({type: 'change_state', payload: {name: 'towary_temporary_array', value: towary_temporary_array}});
                    }}/>
                </div>
                <div className="kwota_za_towar">
                    Suma: <b>{app.towary_temporary_array[props.id].count * (parseInt(app.towary[app.towary_temporary_array[props.id].index].zlote)+(parseInt(app.towary[app.towary_temporary_array[props.id].index].grosze)/100))} zł</b>
                </div>
            </div>
        </>
    )
}

export default Strona_glowna;