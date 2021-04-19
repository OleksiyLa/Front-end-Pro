import React, { useEffect, useState } from 'react';
import { loadWeather5DaysByCityName } from '../services/weatherService';
import { useParams } from 'react-router';
import Table, { Td, Tr } from './Table';
import { DIRECTION, sort } from '../services/utils';

const ForecastFiveDays = ({ sortField, sortDirection, setSortDirectionField, setSortField, forecast, setWeather }) => {
    const columns = [{
        title: 'Date',
        sortField: 'dt'
    }, {
        title: 'Feels like'
    }, {
        title: 'Temperature',
        sortField: 'main.temp'
    }, {
        title: 'Temperature max'
    }, {
        title: 'Temperature min'
    }];

    const routeParams = useParams();
    // const [forecast, setWeather] = useState(null);

    const onClickSort = (newSortField) => {
        if (sortField === newSortField) {
            setSortDirectionField(sortDirection === DIRECTION.ASC ? DIRECTION.DEC : DIRECTION.ASC)
        }

        setSortField(newSortField);
    };

    useEffect(() => {
        loadWeather5DaysByCityName(routeParams.city)
            .then(weather => {
                setWeather(weather);
            });
    }, [routeParams.city]);

    useEffect(() => {
        if (sortField) {
            setWeather((currentForecast) => {
                console.log(currentForecast)
                return {
                    ...currentForecast,
                    list: sort(currentForecast.list, sortField, sortDirection)
                };
            })
        }
    }, [sortField, sortDirection]);

    return forecast && (
        <div>

            <Table
                columns={columns}
                onClickSort={onClickSort}
            >
                {forecast.list.map(({main, dt_txt}) => {
                    return <Tr key={dt_txt}>
                        <Td>{dt_txt}</Td>
                        <Td>{main.feels_like}</Td>
                        <Td>{main.temp}</Td>
                        <Td>{main.temp_max}</Td>
                        <Td>{main.temp_min}</Td>
                    </Tr>
                })}
            </Table>
        </div>
    );
};

export default ForecastFiveDays;
