import React from 'react';
import './form.css';
import t from '../../locales/lang';
// import Speech from './microphone';

const Form = ({lang, icon, weatherMethod, buttonsDisabled}) => {

  const language = t[lang];
  const freezedButtonStyle = buttonsDisabled ? ' freezed' : '';
  return (
    <div>
      {icon &&
        <form className="form" onSubmit={weatherMethod}>
          <input className="search-input" type="search" name="city" required placeholder={language.search} autoComplete="off"></input>
          <button className={"button btn" + freezedButtonStyle} disabled={buttonsDisabled}>{language.find}</button>
          {/* <Speech voiceSearch = {this.props.voiceSearch} language = {this.props.language} /> */}
        </form>
      }        
    </div>
  );

};

export default Form;

