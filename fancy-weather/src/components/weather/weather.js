import React from 'react';
import './weather.css';
import Clock from './clock';
import t from '../../locales/lang';

class Weather extends React.Component {

  render() {

    const { temp, celsius, weather, feels_like, time_zone } = this.props;
    const lang = t[this.props.lang];

    return (
      <div className="weather-wrapper">
        <p id="city" className="city">{this.props.city}, {this.props.country}</p>
        <Clock time_zone = {time_zone} lang = {lang}/>
        <div className="weather-container">
          <div className="weather-today">
            <p>{celsius ? temp : Math.round(temp * (9/5) + 32) }</p>
          </div>
          <div className="weather-data">
            <img className="weather-img" src={"http://openweathermap.org/img/wn/" + this.props.icon + "@2x.png"} alt="Forecast"></img>
            <p>{lang.weather[weather]}</p>
            <p>{lang.feels_like}: {feels_like}°</p>          
            <p>{lang.wind}: {this.props.wind} m/s</p>           
            <p>{lang.humidity}: {this.props.humidity}%</p>            
          </div>
        </div>
      </div>
    );
  }
};

export default Weather;
