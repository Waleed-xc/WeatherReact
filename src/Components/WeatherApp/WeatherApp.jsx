import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"

export const WeatherApp = () => {

    let api_key = '' // put your openweathermap api key here
    const [WeatherICON, setWeathericon] = useState(cloud_icon);

    const search = async () => {




        const element = document.getElementsByClassName("cityInput") // if the city does exist print the city metrics
        if (element[0].value === "" || element[0].value === null) {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`; //  api request from openweathermap

        let response = await fetch(url);
        let data = await response.json(); // beautify json recieved from openweathermap

        if (!response.ok) // if the city doesn't exist print a warning message letting the user know that the city doesn't exist
        {
            alert(`The city "${element[0].value}" doesn't exist!`);
            return 0;
        }






        const humidity = document.getElementsByClassName("humidity-percent")// select and  manipulate the document object model for humidity-percent
        const wind = document.getElementsByClassName("wind-rate")           // select and  manipulate the document object model for wind-rate
        const temprature = document.getElementsByClassName("W-temp")        // select and  manipulate the document object model for W-temp
        const location = document.getElementsByClassName("W-location")      // select and  manipulate the document object model for W-location
        humidity[0].innerHTML = data.main.humidity + " %";                  
        wind[0].innerHTML = data.wind.speed + "km/h";                       
        temprature[0].innerHTML = data.main.temp + " C";                    
        location[0].innerHTML = data.name;


        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWeathericon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWeathericon(cloud_icon);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWeathericon(drizzle_icon);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWeathericon(drizzle_icon);
        }

        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWeathericon(rain_icon);
        }

        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWeathericon(rain_icon);
        }

        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWeathericon(snow_icon);
        }
        else {
            setWeathericon(clear_icon);
        }

    }//display icons based upon the weather state by taking the weather state from the api




    return (
        <div className="background">
            <div className='bar'>
                <input type="text" className='cityInput' placeholder='Search for City' />
                <div className="Search_icon" onClick={() => { search() }} >
                    <img src={search_icon} alt="search" />
                </div>
            </div>

            <div className="W-image"> <img src={WeatherICON} alt="cloud" /></div>
            <div className="W-temp"> 24c </div>
            <div className="W-location"> london</div>

            <div className="container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18km h </div>
                        <div className="text">Windspeed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp