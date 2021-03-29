const express = require('express');
const bodyParser = require('body-parser');
const APIService = require('./APIService');
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/current/weather/', APIService.getCurrentWeather)

app.get('/forecast/weather', APIService.getWeatherForecast)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});