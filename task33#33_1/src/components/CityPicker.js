import { useRef, useState } from 'react';
import {loadWeatherByCityName} from '../services/weatherService';
import {
    Link
  } from "react-router-dom";

// functional component
export default function CityPicker(props) {
    const [weather, setWeather] = useState(null);
    const [value, setValue] = useState('');

    // vanilla js
    // const cityPicker = document.querySelector('.city-picker');

    // react way - refs
    const cityPicker = useRef();

    const onChange = event => {
        loadWeatherByCityName(event.target.value)
            .then((weather) => {
                setWeather(weather.main);

                if (props.cityChanged) {
                    props.cityChanged(weather);
                }
            });
        
        setValue(event.target.value);
        cityPicker.current.classList.add('TEST');
    };

    return (
        <div className="city-picker">
            <h2>City picker</h2>
            <div>
                Pick city: 
                <select onChange={onChange} defaultValue={value} ref={cityPicker}>
                    <option disabled value={''}/>
                    {props.myCities.map((item, index) => <option key={`id-${index}`} value={item}>{item}</option>)}
                </select>
            </div>
            {weather && (
                <div>
                    <h3>Short info</h3>
                    Temp: {weather.temp}, Feels like: {weather.feels_like}
                    <br />
                    <h3>Details</h3>
                    <Link to={`/city-details/${value}`}>Go to details</Link>
                    <h3>Forecast for 5 days</h3>
                    <Link to={`/city-details-5-days/${value}`}>Go to forecast 5 days</Link>
                </div>
            )}
            {props.test && <div>Test text: {props.test}</div>}
        </div>
    );
}
