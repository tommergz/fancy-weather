import React from 'react';
import './app.css';
import Setting from '../setting';
import Form from '../form';
import Weather from '../weather';
import Forecast from '../forecast';
import Map from '../map';

// import t from '../../locales/lang';

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
    lang: "ru",
    load: false,
    error: undefined
  }

  gettingRandomImage = async (time) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${time}&client_id=${IMG_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
    } else {
      const data = await res.json();
      const imageUrl = await data.urls.full;
      let img = new Image();
      let wrapper = document.getElementById('common-wrapper');
      if (!this.state.load) { wrapper.classList.add('loading') };

      img.onload = () => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        if (!this.state.load) { 
          wrapper.classList.remove('loading');  
          this.setState({
            load: true
          })
        }
      }
      img.src = imageUrl; 
      if (img.complete) {
        img.onload();
      }
    }
  }

  componentDidMount() {  this.getContent('Tokyo')  }

  getCoords = async (city, lang) => {

    const api_coords = await
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${COORDS_API_KEY}&language=${lang}`);
      const coordinates = await api_coords.json();
      const town = coordinates.results[0].formatted.split(',')[0];
      const country = coordinates.results[0].components.country;
      const {lat, lng} = coordinates.results[0].geometry;
      const time_zone = coordinates.results[0].annotations.timezone.name;
      console.log(coordinates.results[0]);
      return {town, country, lat, lng, time_zone}
  }

  getContent = async (city) => {
    const lang = this.state.lang;
    try {
      
      const {town, country, lat, lng, time_zone} = await this.getCoords(city, lang);

      const moment = require('moment-timezone');
      const newTime = +(moment().tz(time_zone).format('HH').split(' ')) + 0.1;   

      let timeOfDay = 
        (12 > newTime && newTime > 6) ? 'morning' : 
        (18 > newTime && newTime > 12) ? 'day' :  
        (24 > newTime && newTime > 18) ? 'evening' : 
        (6 > newTime && newTime > 0) ? 'night' : '';
      
      await this.gettingRandomImage(timeOfDay);

      const api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`);
      const data = await api_url.json();
      console.log(data);
      const newIcon = data.weather[0].icon;
      const weather = data.weather[0].id;
      const temp = Math.round(data.main.temp - 273);
      const feels_like = Math.round(data.main.feels_like - 273);
      const wind = data.wind.speed;
      const humidity = data.main.humidity;
      

      const forecast_api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`)
      const forecastData = await forecast_api_url.json();

      let dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("18:00:00"));

      dailyData = dailyData.splice(1,3);

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

  changeImage = async (e) => {
    e.preventDefault();

    let btn = e.target;
    btn.classList.add('image-button-anime');
    console.log(btn.classList);
    setTimeout(
      function() {
        this.classList.remove('image-button-anime')
      }
      .bind(btn),
      2000
    );

    const cityText = document.getElementById('city');
    const city = cityText.innerText.split(',')[0];

    const {time_zone} = await this.getCoords(city);

    const moment = require('moment-timezone');
    const newTime = +(moment().tz(time_zone).format('HH').split(' ')) + 0.1;   
    
    let timeOfDay = 
      (12 > newTime && newTime > 6) ? 'morning' : 
      (18 > newTime && newTime > 12) ? 'day' :  
      (24 > newTime && newTime > 18) ? 'evening' : 
      (6 > newTime && newTime > 0) ? 'night' : '';
    
    await this.gettingRandomImage(timeOfDay);

  }

  switchLang = async (e) => {
    e.preventDefault();
    const setLang = document.getElementById('set-lang');
    document.getElementById('ul').style.maxHeight = '0px';
    setLang.style.borderRadius = '.5rem';
    const newLang = e.target.id;
    const settlement = document.getElementById('city').innerText.split(',')[0];
    setLang.innerHTML = newLang === 'en' ? 'EN' : 'RU';
    const {town, country} = await this.getCoords(settlement, newLang);
    this.setState({
      city: town,
      country: country,
      lang: newLang
    })
  }

  gettingDegrees = (e) => {
    e.preventDefault();
    const degreeType = e.target.id.slice(0,-7);

    const fahrenheitButton = document.getElementById('fahrenheit-button');
    const celsiusButton = document.getElementById('celsius-button');
    
    if (degreeType === 'fahrenheit') {
      fahrenheitButton.style.background = 'rgba(76,82,85,.7)';
      celsiusButton.style.background = 'black';
      fahrenheitButton.disabled = true;
      celsiusButton.disabled = false;
      this.setState({
        celsius: false
      })
    } else {
      celsiusButton.style.background = 'rgba(76,82,85,.7)';
      fahrenheitButton.style.background = 'black';
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
          <Setting imgMethod = {this.changeImage} langMethod = {this.switchLang} degreeMethod = {this.gettingDegrees}/>
          <Form weatherMethod = {this.gettingWeather} lang = {this.state.lang}/>
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
              lang = {this.state.lang}
              error = {this.state.error}
            />
            <Forecast
              icon = {this.state.icon}
              forecast = {this.state.forecast}
              celsius = {this.state.celsius}
              lang = {this.state.lang}
            />
          </div>
          <div className="map">
            <Map
              moveMap = {this.move}
              lng = {this.state.lng}
              lat = {this.state.lat} 
              zoom = {this.state.zoom}
              lang = {this.state.lang}
            /> 
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
