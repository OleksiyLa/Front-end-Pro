import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CityPicker from './components/CityPicker'  
import CityDetails from './components/CityDetails'  
import { useState } from 'react';
import { DIRECTION } from './services/utils';
import ForecastWrapper from './components/ForecastWrapper';
import {SortFromHeader} from './components/SortFromHeader'

function App() {
	const [forecast, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const cities = ['London', 'Kyiv', 'Odesa', 'Dnipro'];

  const cityChangedHandler = (weather) => {
    document.title = `Our weather in ${weather.name}!`;
    setCurrentWeather(weather);
  }
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirectionField] = useState(DIRECTION.ASC);

  return (
    <Router>
      <div className="App">
        <nav className="menu">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
          {forecast && <SortFromHeader setWeather={setWeather} />}
        </nav>

        <Switch>
          <Route path="/city-details/:city">
            {/* city - route param */}
            <CityDetails currentWeather={currentWeather} />
          </Route>

          <Route path="/city-details-5-days/:city">
            {/* city - route param */}
            <ForecastWrapper
                sortField={sortField}
                sortDirection={sortDirection}
                setSortDirectionField={setSortDirectionField}
                setSortField={setSortField}
								forecast={forecast}
								setWeather={setWeather}
            />
          </Route>

          <Route path="/contact">
            Contact
          </Route>
          <Route path="/home">
            <CityPicker myCities={cities} cityChanged={cityChangedHandler} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
