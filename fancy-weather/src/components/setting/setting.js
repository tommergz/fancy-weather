import React from 'react';
import './setting.css';

class Setting extends React.Component {

  componentDidMount = () => {
    document.getElementById('celsius-button').disabled = true;
  }

  buttonHover = (e) => {
    if (!e.target.disabled) {
      e.target.style.background = 'rgba(223, 228, 231, 0.7)';
    } 
  }
  
  buttonLeave = (e) => {
    if (!e.target.disabled) {
      e.target.style.background = 'black';
    } 
  }

  langButtonLeave = (e) => {
    e.target.style.background = 'black';
  }

  list = document.getElementById('ul');

  langButtonClick = () => {
    document.getElementById('ul').style.maxHeight = '300px';
    document.getElementById('set-lang').style.borderRadius = '.5rem .5rem 0 0'
  }

  render() {
    const { imgMethod, langMethod, degreeMethod } = this.props;
    return (
      <div className="button-cluster">
        <button className="img-button" onClick={imgMethod}>&#8617;</button>
        <nav id="slow_nav">
          <ul>
            <li>
              <button id="set-lang" className="set-lang-button" onMouseOver={this.buttonHover} onMouseLeave={this.langButtonLeave} onClick={this.langButtonClick}>RU</button>
              <ul id="ul">
                <li><button id="en" className="lang-button" onClick={langMethod}>EN</button></li>
                {/* <li><button id="be" className="lang-button" onClick={langMethod}>BE</button></li> */}
                <li><button id="ru" className="lang-button" onClick={langMethod}>RU</button></li>
              </ul>
            </li>
          </ul>
        </nav>
        <button id="fahrenheit-button" onClick={degreeMethod} onMouseOver={this.buttonHover} onMouseLeave={this.buttonLeave}>°F</button>
        <button id="celsius-button" onClick={degreeMethod} onMouseOver={this.buttonHover} onMouseLeave={this.buttonLeave}>°C</button>
      </div>
    );
  }
};

export default Setting;