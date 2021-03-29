const fetch = require('node-fetch');

const TelegramBot = require('./TelegramBotService')

const openWeatherConfig = {
    protocol: 'http://',
    domain: 'api.openweathermap.org',
    resourseBase: '/data/2.5',
    API_KEY: '3e0b8f4397a4aefa9f4c24f28e67108d'
}

const {protocol, domain, resourseBase, API_KEY} = openWeatherConfig;
const openWeatherPath = `${protocol}${domain}${resourseBase}`;


const getCurrentWeather = (req,res)=>{
    fetch(`${openWeatherPath}/weather?appid=${API_KEY}&units=metric&q=${req.query.q}`)
        .then(resp=>resp.json())
        .then(data=>{
        TelegramBot.sendDataToTelegram(JSON.stringify(data, null, '\t'))
        res.json(data)})
}

const getWeatherForecast = (req,res)=>{
    fetch(`${openWeatherPath}/forecast?appid=${API_KEY}&units=metric&q=${req.query.q}`)
        .then(resp=>resp.json())
        .then(data=> {
            const obj = data.list[2];
            obj.city = data.city.name;
            return obj
        })
        .then(temp=>{
            return { expectedTemperature: {
                temperature: `${temp.main.temp} Celsius `,
                feels_like: `${temp.main.feels_like} Celsius `,
                city: temp.city,
                DateTime: temp.dt_txt
            }}
        })
        .then(data=>{
        TelegramBot.sendDataToTelegram(JSON.stringify(data, null, '\t'))
        res.json(data)
    })
}

module.exports = {
    getCurrentWeather,
    getWeatherForecast
}