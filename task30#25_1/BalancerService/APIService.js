const fetch = require('node-fetch');

const fetchCurrentWeather = (req,res)=>{
    fetch(`http://localhost:8080/current/weather?q=${req.query.city}`)
    .then(resp=>resp.json())
    .then(data=>{
    res.json(data)})
}

const fetchWeatherForecast = (req,res)=>{
    fetch(`http://localhost:8080/forecast/weather?q=${req.query.city}`)
    .then(resp=>resp.json())
    .then(data=>{
        res.json(data)})
}

module.exports = {
    fetchCurrentWeather,
    fetchWeatherForecast
}