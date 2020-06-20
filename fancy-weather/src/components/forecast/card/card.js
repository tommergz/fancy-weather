import React from 'react';
import './card.css';
import t from '../../../locales/lang';
import icons from '../../icons';

let moment = require('moment');

class Card extends React.Component {

  render() {
    let newDate = new Date();
    const weekday = this.props.day.dt * 1000;
    const celsius = this.props.celsius;
    const temp = Math.round(this.props.day.main.temp) - 273;
    newDate.setTime(weekday);
    const lang = t[this.props.lang];

    // const farenheit = (parseInt(this.props.day.main.temp) - 273.15) * (9/5) + 32

    return (
      <div className="weather-card">
        <div>
          <h3 className="card-title">{lang[moment(newDate).format('dddd')]}</h3>
          <div className="card-temp">
            <h2>{ celsius ? temp : Math.round(temp * (9/5) + 32) }°</h2>
            {/* <img src={"http://openweathermap.org/img/wn/" + this.props.day.weather[0].icon + "@2x.png"} alt="Forecast"></img>          */}
            <img src={icons[this.props.icon]} alt="Forecast"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;