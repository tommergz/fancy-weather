import React from 'react';
import './app.css';
import Form from '../form';
import Weather from '../weather';
import Map from '../map';


// const API_KEY = "a79efab23a4b7eced0f536f0d9007cf4";
// const IMG_API_KEY = "cctf-xDi91Q_NDu6y-UuGbw54ZFA4r56dNRTKygmu1Q";

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

  gettingRandomImage = async () => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=cctf-xDi91Q_NDu6y-UuGbw54ZFA4r56dNRTKygmu1Q`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
    } else {
      const data = await res.json();
      const imageUrl = await data.urls.full;
      document.body.style.backgroundImage = `url(${imageUrl})`;    
    }
  }

  componentDidMount() {  this.gettingRandomImage()  }
  componentDidUpdate() {  this.gettingRandomImage()  }

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
      const api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=a79efab23a4b7eced0f536f0d9007cf4`);
      const data = await api_url.json();
      console.log(data);
      this.setState({
        temp: data.main.temp,
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
      <div id="common-wrapper">
        <header>
          <div className="button-cluster__right-sub-cluster">
            <Form weatherMethod={this.gettingWeather} />
          </div>
        </header>
        <div className="main">
          <div className="weather">
            <Weather 
              temp = {this.state.temp}
              city = {this.state.city}
              error = {this.state.error}
            />
          </div>
          <div className="map">
            <Map
              moveMap = {this.move}
              lng = {this.state.lng}
              lat = {this.state.lat} 
              zoom = {this.state.zoom}
            /> 
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
