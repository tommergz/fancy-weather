import React from 'react';
import './form.css';

class Form extends React.Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.weatherMethod}>
        <input className="search-input" type="text" name="city" placeholder="Найти город или индекс"></input>
        <button className="button">Поиск</button>
      </form>
    );
  }
};

export default Form;

