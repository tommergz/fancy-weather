import React from 'react';
import './form.css';
import t from '../../locales/lang';

class Form extends React.Component {
  render() {
    const lang = t[this.props.lang];
    return (
      <form className="form" onSubmit={this.props.weatherMethod}>
        <input className="search-input" type="search" name="city" required placeholder={lang.search} autoComplete="off"></input>
        <button className="button">{lang.find}</button>
      </form>
    );
  }
};

export default Form;

