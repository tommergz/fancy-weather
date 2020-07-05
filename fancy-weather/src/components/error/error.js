import React from 'react';
import './error.css';
import t from '../../locales/lang';

const Error = ({lang}) => {
  return (  
    <div className="error-block">
      <p className='error-message'>{t[lang].error}</p>
    </div>
  )
}

export default Error;