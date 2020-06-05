import React from 'react';
import './weather.css';
// import ReactSVG from 'react-svg'
// // const reqSvgs = require.context ('../icons/animated', true, /\.svg$/ )

// // const svgs = reqSvgs
// //   .keys ()
// //   .reduce ( ( images, path ) => {
// //     images[path] = reqSvgs ( path )
// //     return images
// //   }, {} )

class Weather extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div className="weather-container">
        <p className="city">{this.props.city}</p>
        <div className="weather-today">
          {data ? <p>{Math.round(this.props.temp)}</p> : ''}
          {data ? <img src={"http://openweathermap.org/img/wn/" + this.props.data.weather[0].icon + "@2x.png"} alt="Forecast"></img> : '' }  
        </div>
      </div>
    );
  }
};

export default Weather;
