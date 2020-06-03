import React from 'react';
import './form.css';

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.weatherMethod}>
        <input type="text" name="city" placeholder="Найти город или индекс"></input>
        <button>Поиск</button>
      </form>
    );
  }
};

export default Form;

