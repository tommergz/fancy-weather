import React from 'react';
import './form.css';
import t from '../../locales/lang';
import Speech from './microphone';

class Form extends React.Component {
  render() {
    const lang = t[this.props.lang];
    return (
      <div>
        {this.props.icon &&
          <form className="form" onSubmit={this.props.weatherMethod}>
            <input className="search-input" type="search" name="city" required placeholder={lang.search} autoComplete="off"></input>
            <button className="button bttn">{lang.find}</button>
            <Speech voiceSearch = {this.props.voiceSearch} lang = {this.props.lang} />
          </form>
        }
        
      </div>

    );
  }
};

export default Form;

