import React from 'react';
import './weather.css';
import Clock from './clock';

class Weather extends React.Component {

  render() {
    const { temp, celsius, weather, feels_like, time_zone } = this.props;
    return (
      <div className="weather-wrapper">
        <p className="city">{this.props.city}, {this.props.country}</p>
        <Clock time_zone = {time_zone}/>
        <div className="weather-container">
          <div className="weather-today">
            <p>{celsius ? temp : Math.round(temp * (9/5) + 32) }</p>
          </div>
          <div className="weather-data">
            <img className="weather-img" src={"http://openweathermap.org/img/wn/" + this.props.icon + "@2x.png"} alt="Forecast"></img>
            <p>{weather}</p>
            <p>feels like: {feels_like}°</p>          
            <p>wind: {this.props.wind} m/s</p>           
            <p>humidity: {this.props.humidity}%</p>            
          </div>
        </div>
      </div>
    );
  }
};

export default Weather;
