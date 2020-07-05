import apiKeys from './apiKeys'
import t from '../locales/lang';

const COORDS_API_KEY = apiKeys.coords;
const WEATHER_API_KEY = apiKeys.weather;
const IMG_API_KEY = apiKeys.img;

export default class apiService {
  
  load = false;

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
     
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getCoords = async (city, lang) => {
    const coordinates = await this.getResource(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${COORDS_API_KEY}&language=${lang}`);     
    
    if (!coordinates.results[0]) {
      const undefindCity = document.getElementById('error');
      undefindCity.innerHTML = t[lang].ghostCity;
      undefindCity.style.visibility = 'inherit';
      setTimeout(() => undefindCity.style.visibility = 'hidden', 2000);
    }

    const town = coordinates.results[0].formatted.split(',')[0];
    const country = coordinates.results[0].components.country;
    const {lat, lng} = coordinates.results[0].geometry;
    const time_zone = coordinates.results[0].annotations.timezone.name;
    if (this.load) {
      const buttons = document.getElementsByClassName('bttn');
      Array.from(buttons).forEach(function(btn){
        btn.disabled = true;
        btn.style.color = 'rgb(63, 187, 218)';
      })
    }
    return {town, country, lat, lng, time_zone}
  }

  getWeather = async (lat, lng) => {
    let data = await this.getResource(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`);
    
    const newIcon = data.weather[0].icon;
    const weather = data.weather[0].id;
    const temp = Math.round(data.main.temp - 273);
    const feels_like = Math.round(data.main.feels_like - 273);
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    
    const forecastData = await this.getResource(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`);

    let dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("18:00:00"));
    dailyData = dailyData.splice(1,3);

    if (!this.load) {
      this.load = true;
    } else {
      this.btnStyles()
    }
    return {newIcon, weather, temp, feels_like, wind, humidity, dailyData}
  }

  getImage = async (time) => {
    const data = await this.getResource(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${time}&client_id=${IMG_API_KEY}`);
    return data?.urls?.full;
  } 

  btnStyles = () => {
    const buttons = document.getElementsByClassName('bttn');
    const mic = document.getElementById('mic');
    
    Array.from(buttons).forEach(btn => {
      btn.disabled = false;
      btn.style.color = 'white';
      mic.style.color = 'rgba(223, 228, 231, 0.7)';
    })   
    const degreeBtn = document.getElementById('celsius-button');
    if (degreeBtn) {
      if (degreeBtn.style.cursor === 'auto' || degreeBtn.style.cursor === '') {
        degreeBtn.disabled = true;
      } else {
        document.getElementById('fahrenheit-button').disabled = true;
      }
    }
  }
}