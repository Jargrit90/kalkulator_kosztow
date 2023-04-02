import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../App.css';
import './towary.css';

import * as f from './functions';

let props_nazwa_towaru = "";
let props_jednostka = "";
let props_zlote = 0;
let props_grosze = 0;
let props_index = 0;

function Towary(){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    let index = 0;
    useEffect(()=>{
        let towary = localStorage.getItem("towary");
        let json = JSON.parse(towary);
        if(json === null){
            json = [];
        }
        dispatch({type: 'change_state', payload: {name: 'towary', value: json}});
    },[]);
    let towary = app.towary.map(el => <Towar index={index} key={index++} nazwa_towaru={el.name} jednostka={el.jednostka} zlote={el.zlote} grosze={el.grosze} cena={el.cena}/>);
    return (
        <>
            <div className="towary_box">
                <div className="towary_btn_box flexCC">
                    <div className="towary_btn flexCC" onClick={()=>dispatch({type: 'change_state', payload:{name: 'dodaj_towar', value: true}})}>Dodaj towar</div>
                </div>
                <div className="towary_box_data flexCC">

                </div>
                {app.dodaj_towar ? <Dodaj_towar /> : null}

                <div className="lista_towarow">
                    <div className="towar_box flexCC">
                        <div className="nazwa_towaru flexCC"><b>Nazwa towaru</b></div>
                        <div className="jednostka flexCC"><b>Jednostka miary</b></div>
                        <div className="cena_towaru flexCC"><b>Cena jednostkowa</b></div>
                        <div></div>
                    </div>
                    {towary}
                </div>
            </div>
        </>
    )
}

function Towar(props){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    let usun_towar = ()=>{
        let index = props.index;
        let towary = [...app.towary];
        towary.splice(index, 1);
        dispatch({type: 'change_state', payload: {name: 'towary', value: towary}});
        let json = JSON.stringify(towary);
        localStorage.setItem("towary", json);
    }
    let edytuj_towar = ()=>{
        props_index = props.index;
        console.log(props_index);
        props_nazwa_towaru = props.nazwa_towaru;
        props_jednostka = props.jednostka;
        props_zlote = props.zlote;
        props_grosze = props.grosze;
        dispatch({type: 'change_state', payload: {name: 'edytuj_towar', value: true}});
        dispatch({type: 'change_state', payload: {name: 'dodaj_towar', value: true}});
    }
    return (
        <>
            <div className="towar_box flexCC">
                <div className="nazwa_towaru flexCC">{props.nazwa_towaru}</div>
                <div className="jednostka flexCC">{props.jednostka}</div>
                <div className="cena_towaru flexCC">{props.zlote} zł {props.grosze < 10 ? "0" + props.grosze : props.grosze} gr</div>
                <div className="flexCC"><div className="edytuj_towar flexCC" onClick={()=>edytuj_towar()}>Edytuj</div><div className="usun_towar flexCC" onClick={()=>usun_towar()}>Usuń</div></div>
            </div>
        </>
    )
}

function Dodaj_towar(){
    let app = useSelector(state => state.app);
    const dispatch = useDispatch();
    let jednostki = app.jednostki_towarowe.map(el => <option key={el} value={el}>{el}</option>);
    let maks_wartosc = (event)=>{
        let wartosc = event.target.value;
        if(wartosc > 99){
            event.target.value = 99;
        }
    }
    let dodaj_towar = ()=>{
        let nazwa_towaru = f.g(".nazwa_towaru");
        let jednostka = f.g("#jednostka");
        let kwota_1 = f.g(".kwota_1");
        let kwota_2 = f.g(".kwota_2");
        
        let towary = [...app.towary];

        let towar = {};
        if(nazwa_towaru[0].value === ""){
            alert("Nazwa towaru nie może być pusta");
        }
        else {
            let pelna_kwota = parseInt(kwota_1[0].value) * 100 + parseInt(kwota_2[0].value);
            towar = {
                name: nazwa_towaru[0].value,
                jednostka: jednostka.value,
                zlote: kwota_1[0].value,
                grosze: kwota_2[0].value,
                cena: pelna_kwota
            }
            towary.push(towar);
            dispatch({type: 'change_state', payload: {name: 'towary', value: towary}});
            let json = JSON.stringify(towary);
            localStorage.setItem("towary", json);
        }
    }
    let edytuj_towar = ()=>{
        let nazwa_towaru = f.g(".nazwa_towaru");
        let jednostka = f.g("#jednostka");
        let kwota_1 = f.g(".kwota_1");
        let kwota_2 = f.g(".kwota_2");
        
        let towary = [...app.towary];

        if(nazwa_towaru[0].value === ""){
            alert("Nazwa towaru nie może być pusta");
        }
        else {
            let pelna_kwota = parseInt(kwota_1[0].value) * 100 + parseInt(kwota_2[0].value);
            
            towary[props_index].name = nazwa_towaru[0].value;
            towary[props_index].jednostka = jednostka.value;
            towary[props_index].zlote = kwota_1[0].value;
            towary[props_index].grosze = kwota_2[0].value;
            towary[props_index].cena = pelna_kwota;

            dispatch({type: 'change_state', payload: {name: 'towary', value: towary}});
            let json = JSON.stringify(towary);
            localStorage.setItem("towary", json);
        }
    }
    return (
        <>
            <div className="dodaj_towar_box flexCC">
                <div className="close flexCC" onClick={()=>dispatch({type: 'change_state', payload:{name: 'dodaj_towar', value: false}})}>X</div>
                <div className="input_box flexCC">
                    <div className="input_box input_box_title">Nazwa towaru:</div>
                    <input type="text" className="nazwa_towaru" placeholder={props_nazwa_towaru !== "" ? props_nazwa_towaru : undefined} required/>
                </div>
                <div className="input_box flexCC">
                    <div className="input_box input_box_title">Jednostka towarowa:</div> 
                    <select name="towary" id="jednostka">
                        {jednostki}
                    </select> 
                </div>
                <div className="input_box flexCC">
                    <div className="input_box input_box_title">Cena jednostkowa:</div>  
                    <div className="kwota"><input type="number" className="kwota_1"  min={0} required placeholder={props_zlote !== "" ? props_zlote : undefined}/> zł </div>
                    <div className="kwota"><input type="number" className="kwota_2" min={0} max={99} placeholder={props_grosze !== "" ? props_grosze : undefined} onChange={(event)=>maks_wartosc(event)} required/> gr </div>
                </div>
                <div className="flexCC" onClick={app.edytuj_towar ? ()=>{edytuj_towar(); dispatch({type: 'change_state', payload: {name: 'dodaj_towar', value: false}})} : ()=>{dodaj_towar(); dispatch({type: 'change_state', payload: {name: 'dodaj_towar', value: false}})}}>Zapisz towar</div>
            </div>
        </>
    )
}

export default Towary;