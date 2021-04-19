import React from 'react';
import ForecastFiveDays from './ForecastFiveDays';

const ForecastWrapper = ({ sortField, sortDirection, setSortDirectionField, setSortField, forecast, setWeather }) => {
    return (
        <div>
            <hr/>
            <ForecastFiveDays
                sortField={sortField}
                sortDirection={sortDirection}
                setSortDirectionField={setSortDirectionField}
                setSortField={setSortField}
                forecast={forecast}
                setWeather={setWeather}
            />
        </div>
    );
};

export default ForecastWrapper;
