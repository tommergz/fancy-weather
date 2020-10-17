import React from "react";
import './degrees-switcher.css';

const DegreesSwitcher = ({freezedButtonStyle, degreeMethod, celsius, fDisabled, cDisabled}) => {

  const fahrenheitBtnHoverStyles = fDisabled ? 
    '' : 'degrees-btn-hover-styles';
  const celsiusBtnHoverStyles = cDisabled ? 
    '' : 'degrees-btn-hover-styles';

  const fahrenheitBtnFocus = celsius ? 
    `inactive-degrees-btn ${fahrenheitBtnHoverStyles}` : `active-degrees-btn ${fahrenheitBtnHoverStyles}`;
  const celsiusBtnFocus = celsius ? 
    `active-degrees-btn ${celsiusBtnHoverStyles}` : `inactive-degrees-btn ${celsiusBtnHoverStyles}`;

  const fahrenheitBtnStyles = `${freezedButtonStyle} ${fahrenheitBtnFocus}`;
  const celsiusBtnStyles = `${freezedButtonStyle} ${celsiusBtnFocus}`
    
  return (
    <div className="degree-btn-wrapper">
      <button id="fahrenheit-button" className={"btn set-degrees-button " + fahrenheitBtnStyles} 
        onClick={degreeMethod} 
        disabled = {fDisabled}
      >
        °F
      </button>
      <button id="celsius-button" className={"btn set-degrees-button " + celsiusBtnStyles} 
        onClick={degreeMethod} 
        disabled = {cDisabled}
      >
        °C
      </button>     
    </div>  
  )
}

export default DegreesSwitcher;