const API_KEY = '3e0b8f4397a4aefa9f4c24f28e67108d';

export const loadWeatherByCityName = cityName => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=${cityName}`)
        .then(resp => resp.json());
}

export const loadWeather5DaysByCityName = cityName => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&q=${cityName}`)
        .then(resp => resp.json());
}
