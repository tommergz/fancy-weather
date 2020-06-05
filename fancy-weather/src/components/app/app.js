import React from 'react';
import './app.css';
import Form from '../form';
import Weather from '../weather';
import Forecast from '../forecast';
import Map from '../map';

const COORDS_API_KEY = "0c220e3ff07646af8d20f76ab941d055";
const WEATHER_API_KEY = "a79efab23a4b7eced0f536f0d9007cf4";
const IMG_API_KEY = "cctf-xDi91Q_NDu6y-UuGbw54ZFA4r56dNRTKygmu1Q";

class App extends React.Component {

  state = {
    weatherData: undefined,
    temp: undefined,
    city: undefined,
    country: undefined,
    lng: undefined,
    lat: undefined,
    zoom: undefined,
    forecast: [],
    error: undefined
  }

  gettingRandomImage = async () => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${IMG_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
    } else {
      const data = await res.json();
      const imageUrl = await data.urls.full;
      document.body.style.backgroundImage = `url(${imageUrl})`;    
    }
  }

  componentDidMount() {  this.getContent('Tokio')  }
  // componentDidUpdate() {  this.gettingRandomImage()  }

  getContent = async (city) => {
    try {
      const api_coords = await
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${COORDS_API_KEY}`);
      const coordinates = await api_coords.json();
      const name = coordinates.results[0].formatted;
      const {lat, lng} = coordinates.results[0].geometry;
      console.log(coordinates);

      const api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`);
      const data = await api_url.json();

      const forecast_api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`)
      const forecastData = await forecast_api_url.json();
      const dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("18:00:00"));

      dailyData.splice(2,2);
      
      this.gettingRandomImage()
      this.setState({
        weatherData: data,
        temp: data.main.temp,
        city: name,
        lng: lng,
        lat: lat,
        zoom: 9,
        forecast: dailyData,
        error: "" 
      })
    } catch(err) {
      console.log(err)
    }
  }

  gettingWeather = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    this.getContent(city);
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
              data = {this.state.weatherData}
              temp = {this.state.temp}
              city = {this.state.city}
              error = {this.state.error}
            />
            <Forecast
              forecast = {this.state.forecast}
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
