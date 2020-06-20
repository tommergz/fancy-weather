import React from 'react';
import Card from './card';
import './forecast.css';
// import t from '../../locales/lang';


class Forecast extends React.Component {
  // lang = t[this.props.lang];
  formatCards = () => {
    return this.props.forecast.map((day, index) => <Card day={day} key={index} celsius={this.props.celsius} lang={this.props.lang} icon={this.props.icon}/>)
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