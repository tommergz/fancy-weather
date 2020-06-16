import React from 'react';
import './app.css';
import Setting from '../setting';
import Form from '../form';
import Weather from '../weather';
import Forecast from '../forecast';
import Map from '../map';

const COORDS_API_KEY = "0c220e3ff07646af8d20f76ab941d055";
const WEATHER_API_KEY = "a79efab23a4b7eced0f536f0d9007cf4";
const IMG_API_KEY = "cctf-xDi91Q_NDu6y-UuGbw54ZFA4r56dNRTKygmu1Q";

class App extends React.Component {

  state = {
    icon: undefined,
    temp: undefined,
    weather: undefined,
    feels_like: undefined,
    wind: undefined,
    humidity: undefined,
    city: undefined,
    country: undefined,
    lng: undefined,
    lat: undefined,
    zoom: undefined,
    forecast: [],
    celsius: true,
    time_zone: undefined,
    lang: 'en',
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

  componentDidMount() {  this.getContent('Tokyo')  }

  getContent = async (city) => {
    const lang = this.state.lang;
    try {
      const api_coords = await
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${COORDS_API_KEY}&language=${lang}`);
      const coordinates = await api_coords.json();
      const town = coordinates.results[0].formatted.split(',')[0];
      const country = coordinates.results[0].components.country;
      const {lat, lng} = coordinates.results[0].geometry;
      console.log(coordinates.results[0]);

      const api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`);
      const data = await api_url.json();
      console.log(data);
      const newIcon = data.weather[0].icon;
      const weather = data.weather[0].description;
      const temp = Math.round(data.main.temp - 273);
      const feels_like = Math.round(data.main.feels_like - 273);
      const wind = data.wind.speed;
      const humidity = data.main.humidity;
      const time_zone = coordinates.results[0].annotations.timezone.name;

      const forecast_api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`)
      const forecastData = await forecast_api_url.json();

      const dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("18:00:00"));

      dailyData.splice(2,2);
      
      this.gettingRandomImage()

      this.setState({
        icon: newIcon,
        temp: temp,
        weather: weather,
        feels_like: feels_like,
        wind: wind,
        humidity: humidity,
        city: town,
        country: country,
        lng: lng,
        lat: lat,
        zoom: 9,
        forecast: dailyData,
        time_zone: time_zone,
        error: "" 
      })
    } catch(err) {
      console.log(err)
    }
  }

  gettingDegrees = (e) => {
    e.preventDefault();
    const degreeType = e.target.id.slice(0,-7);

    const fahrenheitButton = document.getElementById('fahrenheit-button');
    const celsiusButton = document.getElementById('celsius-button');
    
    if (degreeType === 'fahrenheit') {
      fahrenheitButton.style.background = 'rgba(180,184,187,.7)';
      celsiusButton.style.background = 'rgba(76,82,85,.7)';
      fahrenheitButton.disabled = true;
      celsiusButton.disabled = false;
      this.setState({
        celsius: false
      })
    } else {
      celsiusButton.style.background = 'rgba(180,184,187,.7)';
      fahrenheitButton.style.background = 'rgba(76,82,85,.7)';
      celsiusButton.disabled = true;
      fahrenheitButton.disabled = false;
      this.setState({
        celsius: true
      })
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
        <header className="header">
          <Setting degreeMethod = {this.gettingDegrees}/>
          <Form weatherMethod = {this.gettingWeather} />
        </header>
        <div className="main">
          <div className="weather">
            <Weather 
              icon = {this.state.icon}
              temp = {this.state.temp}
              city = {this.state.city}
              country = {this.state.country}
              weather = {this.state.weather}
              feels_like = {this.state.feels_like}
              wind = {this.state.wind}
              humidity = {this.state.humidity}
              celsius = {this.state.celsius}
              time_zone = {this.state.time_zone}
              error = {this.state.error}
            />
            <Forecast
              forecast = {this.state.forecast}
              celsius = {this.state.celsius}
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
