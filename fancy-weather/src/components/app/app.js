import React from 'react';
import Form from '../form';
import Weather from '../weather';
import Map from '../map';

const API_KEY = "a79efab23a4b7eced0f536f0d9007cf4";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    lng: -22.9226,
    lat: 38.3591,
    zoom: 4,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    try {
      const city = e.target.elements.city.value;
      const api_coords = await
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0c220e3ff07646af8d20f76ab941d055`);
      const coordinates = await api_coords.json();
      const name = coordinates.results[0].formatted;
      const {lat, lng} = coordinates.results[0].geometry;
      console.log(coordinates);
      // const api_url = await 
      // fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
      // const data = await api_url.json();
      // console.log(data);
      this.setState({
        // temp: data.main.temp,
        city: name,
        lng: lng,
        lat: lat,
        zoom: 9,
        error: "" 
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="button-cluster__right-sub-cluster">
        <Form weatherMethod={this.gettingWeather} />
        <Map
          moveMap = {this.move}
          lng = {this.state.lng}
          lat = {this.state.lat} 
          zoom = {this.state.zoom}
        /> 
        <Weather 
          temp = {this.state.temp}
          city = {this.state.city}
          country = {this.state.country}
          error = {this.state.error}
        />
      </div>
    );
  }
}

export default App;
