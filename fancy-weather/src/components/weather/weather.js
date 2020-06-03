import React from 'react';
import './weather.css';

class Weather extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.city}</p>
        <p>{this.props.temp}</p>
      </div>
    );
  }
};

export default Weather;
