import React from 'react';
import './setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';


class Setting extends React.Component {

  componentDidMount = () => {
    const celsiusBtn = document.getElementById('celsius-button');
    if (celsiusBtn) celsiusBtn.style.cursor = 'auto';
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
    const { imgMethod, langMethod, degreeMethod, cDisabled, fDisabled, loading } = this.props;
    
    return (
      <div className="setting">
        {this.props.icon ?
          <div className="button-cluster">
            <button className="img-button bttn" onClick={imgMethod}>
              {loading ? <FontAwesomeIcon id="img-button" icon={faRecycle} className="image-button-anime" /> : <FontAwesomeIcon id="img-button" icon={faRecycle} />  }
            </button>
            <nav id="slow_nav">
              <ul>
                <li>
                  <button id="set-lang" className="set-lang-button bttn" onMouseOver={this.buttonHover} onMouseLeave={this.langButtonLeave} onClick={this.langButtonClick}>EN</button>
                  <ul id="ul">
                    <li><button id="en" className="lang-button" onClick={langMethod}>EN</button></li>
                    {/* <li><button id="be" className="lang-button" onClick={langMethod}>BE</button></li> */}
                    <li><button id="ru" className="lang-button" onClick={langMethod}>RU</button></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <button id="fahrenheit-button" className="bttn" onClick={degreeMethod} onMouseOver={this.buttonHover} onMouseLeave={this.buttonLeave} disabled = {fDisabled}>°F</button>
            <button id="celsius-button" className="bttn" onClick={degreeMethod} onMouseOver={this.buttonHover} onMouseLeave={this.buttonLeave} disabled = {cDisabled}>°C</button>
          </div> : ''
        }
      </div>   
    );
  }
};

export default Setting;