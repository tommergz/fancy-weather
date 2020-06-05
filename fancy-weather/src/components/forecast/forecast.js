import React from 'react';
import Card from './card';
import './forecast.css';

class Forecast extends React.Component {
  formatCards = () => {
    return this.props.forecast.map((day, index) => <Card day={day} key={index}/>)
  }

  render() {
    return (
      <div className="forecast-container">
        {this.formatCards()}
      </div>
    )
  }
}

export default Forecast;