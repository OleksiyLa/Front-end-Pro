import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {loadWeatherByCityName} from '../services/weatherService';

// functional component
export default function CityDetails(props) {
    const routeParams = useParams();
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        // componentDidMount
        if (props.currentWeather) {
            setWeather(props.currentWeather);
        } else {
            loadWeatherByCityName(routeParams.city)
                .then(weather => {
                    setWeather(weather);
                });
        }
    }, [routeParams]);


    const getOnClickHandler = id => () => console.log(id);
    
    return (
        <div className="city-details">
            <h2>City Details</h2>
            Current city - {routeParams.city}
            <br />
            {weather && (
                <table border="2">
                    <tbody>
                        {Object.entries(weather).map(([key, value], index) => (
                            <tr data-key={`id-${index}`} key={`id-${index}`} onClick={getOnClickHandler(value)}>
                                <td>{key}</td>
                                <td>{JSON.stringify(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}