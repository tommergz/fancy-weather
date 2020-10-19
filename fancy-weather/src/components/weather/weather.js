import React from 'react';
import './weather.css';
import Clock from './clock';
import t from '../../locales/lang';
import icons from '../../assets/obj-icons';

class Weather extends React.Component {

  render() {

    const { city, country, temp, celsius, weather, feels_like, wind, humidity, icon, time_zone } = this.props;
    const lang = t[this.props.lang];
    return (
      <div>
        {this.props.icon ?
          <div className="weather-wrapper">
            <p id="city" className="city">{city}, {country}</p>
            <Clock time_zone = {time_zone} lang = {lang}/>
            <div className="weather-container">
              <div className="weather-today">
                <p>{celsius ? temp : Math.round(temp * (9/5) + 32) }</p>
              </div>
              <div className="weather-data">
                {/* <img className="weather-img" src={"http://openweathermap.org/img/wn/" + this.props.icon + "@2x.png"} alt="Forecast"></img> */}
                <img className="weather-img" src={icons[icon]} alt="Forecast"></img>
                <p className="first-forecast-p">{lang.weather[weather]}</p>
                <p>{lang.feels_like}: {feels_like}°</p>   
                <p>{lang.wind}: {wind} m/s</p>         
                <p>{lang.humidity}: {humidity}%</p>           
              </div> 
            </div>
          </div> : ''
        }
      </div>
    ); 
  }
};

export default Weather;
