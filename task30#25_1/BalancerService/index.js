const express = require('express');
const bodyParser = require('body-parser');

const APIService = require('./APIService');

const app = express();
const port = 7070;

app.use(bodyParser.json());
app.use(express.static(__dirname + './../'));

app.get('/weather/current', APIService.fetchCurrentWeather);

app.get('/weather/forecast/6h', APIService.fetchWeatherForecast);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});