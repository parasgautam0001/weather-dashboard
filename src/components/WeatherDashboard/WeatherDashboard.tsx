import React, { useState } from "react";
import './WeatherDashboard.css';

import Search from '../assets/search.png';
import Cloud from '../assets/cloud.png';
import Clear from '../assets/clear.png';
// import Rain from '../assets/rain.png';
// import Snow from '../assets/snow.png';
import Humidity from '../assets/humidity.png';
import Wind from '../assets/wind.png';
import { API_KEY, HUMIDITY, WEATHER_URL, WIND } from "../constants/WeatherConstants.ts";


const WeatherDashboard = () => {
    const [city, setCity] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [weatherData, setWeatherData] = useState({ name: "", main: { humidity: "", temp: 273 }, wind: { speed: "" }, weather: [{main: "Clear"}] });

    const searchWeather = async () => {
        if (!city) {
            return;
        }
        const url = `${WEATHER_URL}?q=${city}&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();
        if (data.message) {
            setErrorMessage(data.message);
        }
        else {
            !data.message && setWeatherData(data);
            setErrorMessage("");
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Enter city" onChange={(e) => setCity(e.target.value)} onKeyDown={(e) =>{e.keyCode===13 && searchWeather()}}/>
                <div className="search-icon" onClick={() => searchWeather()}>
                    <img src={Search} alt="search_icon" />
                </div>
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <div className="weather-image">
                <img src={weatherData.weather[0].main.includes('Clear')?Clear:Cloud} alt="cloud" />
            </div>
            <div className="weather-temp">{(weatherData.main.temp-273).toFixed(2)} &deg;C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
                <div className="element">
                    <img src={Humidity} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.main.humidity}</div>
                        <div className="text">{HUMIDITY}</div>
                    </div>
                </div>
                <div className="element">
                    <img src={Wind} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.wind.speed}</div>
                        <div className="text">{WIND}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboard;