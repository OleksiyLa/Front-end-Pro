import React, { useEffect, useState } from 'react';
import {sort, filter} from './../services/utils'

let fullWeather, value, direction, resetWeather;
let bool = false;

export const SortFromHeader = ({ setWeather }) => {
    const [moreOrLess, setMoreOrLess] = useState(false)
    const [field, setField] = useState("");
    
    
    const inputOnChange = (event) => {
        if(event && event.target) {
            value = event.target.value;
        }
        if(field !== '') {
            setWeather((currentForecast) => {
                fullWeather = JSON.parse(resetWeather);
                if(direction !== '' && direction !== undefined){
                    currentForecast = {...fullWeather, list: sort(fullWeather.list, field, direction)}
                } else {
                    currentForecast = {...fullWeather}
                    
                }
                if(value === '' || value === undefined) {
                    return {
                        ...currentForecast
                    };
                }
                if(value && field){
                    return {
                        ...currentForecast,
                        list: filter(currentForecast.list, field, moreOrLess, value)
                    };
                } else {
                    return {
                        ...currentForecast
                    };
                }
            })
        }

    }

    const createResetWeather = () => {
        setWeather((currentWeather)=>{
            resetWeather = JSON.stringify(currentWeather)
            bool = true;
            return currentWeather
        })
    }

    useEffect(()=>{
        createResetWeather()
    }, [])


    useEffect(()=>{
        if(field !== ""){
            inputOnChange(false)
        }
        if(bool && field === ""){
            direction = "";
            value = "";
            setMoreOrLess(false)
            fullWeather = JSON.parse(resetWeather);
            setWeather(JSON.parse(resetWeather))
        }

    }, [moreOrLess, field])


    const onChangeMoreOrLess = () => {
        setMoreOrLess(!moreOrLess);
    }

    const onChangeSort = (e) => {
        fullWeather = JSON.parse(resetWeather);
        if(e && e.target){
            direction = e.target.value
        } 
        if(field){
            setWeather((currentForecast) => {
                
                if((direction === "" || direction === undefined) && !(value === '' || value === undefined) ){
                    return {...fullWeather, list: filter(fullWeather.list, field, moreOrLess, value)}
                } else if((direction === "" || direction === undefined) && (value === '' || value === undefined)){
                    return {...fullWeather}
                } else {
                    return {
                        ...currentForecast,
                        list: sort(currentForecast.list, field, direction)}
            };
        })
        }
    }

    const onChangeSelect = (e) => {
        setField(e.target.value);
    }

    return (
    <div>
        <select onChange={onChangeSelect}>
            <option value="">Select column to sort</option>
            <option value="dt_txt">Date</option>
            <option value="main.feels_like">Feels like</option>
            <option value="main.temp">Temperature</option>
            <option value="main.temp_max">Temperature max</option>
            <option value="main.temp_min">Temperature min</option>
        </select>
        { field && <div>
        <select onChange={onChangeSort}>
            <option value="">choose direction</option>
            <option value="-1">DEC</option>
            <option value="1">ASC</option>
        </select>

        <select onChange={onChangeMoreOrLess}>
            <option value="dec">more then</option>
            <option value="asc">less then</option>
        </select>
        <input onChange={inputOnChange}/>
        </div>}
    </div>
);
}