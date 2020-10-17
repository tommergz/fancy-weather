import React from 'react';
import './undefined-city.css';
import t from '../../locales/lang';

const UndefinedCity = ({lang}) => {
  const undefinedCity = t[lang].ghostCity;
  return (
    <div id="error">
      {undefinedCity}
    </div>
  )
}

export default UndefinedCity;