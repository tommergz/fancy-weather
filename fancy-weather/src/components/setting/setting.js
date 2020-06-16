import React from 'react';
import './setting.css';

class Setting extends React.Component {

  componentDidMount = () => {
    document.getElementById('celsius-button').disabled = true;
  }

  render() {
    return (
      <div className="button-cluster">
        <button className="img-button">&#8617;</button>
        <nav id="slow_nav">
          <ul>
            <li>
              <button className="set-lang-button">EN</button>
              <ul>
                <li><button className="lang-button">EN</button></li>
                <li><button className="lang-button">BE</button></li>
                <li><button className="lang-button">RU</button></li>
              </ul>
            </li>
          </ul>
        </nav>
        <button id="fahrenheit-button" onClick={this.props.degreeMethod}>°F</button>
        <button id="celsius-button" onClick={this.props.degreeMethod}>°C</button>
      </div>
    );
  }
};

export default Setting;