import React from 'react';
import './app.css';
import Setting from '../setting';
import Form from '../form';
import Weather from '../weather';
import Forecast from '../forecast';
import Map from '../map';
import Error from '../error';
import Loading from '../loading';
import apiService from '../../services/api-service'

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
    lang: "en",
    load: false,
    cDisabled: true,
    fDisabled: false,
    loading: true,
    error: false
  }

  apiService = new apiService();

  getRandomImage = async (time) => {
    try {
      const imageUrl = await this.apiService.getImage(time);
      if (imageUrl) {
        let img = new Image();

        img.onload = () => {
          document.body.style.backgroundImage = `url(${imageUrl})`;
          
          if (!this.state.load) { 
            document.body.classList.remove('loading'); 
            this.setState({
              load: true,
              loading: false
            })
          }
          else {
            const loadImgBtn = document.getElementById('img-button');
            if (loadImgBtn) loadImgBtn.classList.remove('image-button-anime');

            this.apiService.btnStyles() 
            
            this.setState({
              loading: false
            })
          }
        }
        img.src = imageUrl; 
        if (img.complete) {
          img.onload();
        }
      } 
    }
    catch {
      if (this.state.load) {
        this.apiService.btnStyles();
        document.getElementById('img-button').classList.remove('image-button-anime');
      }
      this.setState({
        load: true,
        loading: false
      })
    }
  }

  getContent = async (city) => {
    this.setState({
      loading: true
    })
    const lang = this.state.lang;
    const mic = document.getElementById('mic');
    if (mic) {
      mic.classList.remove('mic-animation');
    }
    try {
      
      const {town, country, lat, lng, time_zone} = await this.apiService.getCoords(city, lang);

      const moment = require('moment-timezone');
      const newTime = +(moment().tz(time_zone).format('HH').split(' ')) + 0.1;   

      let timeOfDay = 
        (12 > newTime && newTime > 6) ? 'morning' : 
        (18 > newTime && newTime > 12) ? 'day' :  
        (24 > newTime && newTime > 18) ? 'evening' : 
        (6 > newTime && newTime > 0) ? 'night' : '';
      
      await this.getRandomImage(timeOfDay);

      const {newIcon, weather, temp, feels_like, wind, humidity, dailyData} = await this.apiService.getWeather(lat, lng);

      this.setState( () => {
        const newState = {
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
          error: false
        };
        return newState
      })
    } catch(err) {
      console.log(err.message)
      const imgBtn = document.getElementById('img-button');
      if (imgBtn) imgBtn.classList.remove('image-button-anime');
      if (err.message === `Cannot read property 'formatted' of undefined`) {
        this.apiService.btnStyles();
        return;
      } else {
        this.apiService.btnStyles();
        this.setState({
          error: true,
          load: true
        })
      }
    }
  }

  gettingWeather = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    this.getContent(city);
  }

  voiceSearch = (word) => {
    this.getContent(word);
  };

  changeImage = async (e) => {
    document.getElementById('img-button').classList.add('image-button-anime');
    const cityText = document.getElementById('city');
    const city = cityText.innerText.split(',')[0];

    const {time_zone} = await this.apiService.getCoords(city);
    const moment = require('moment-timezone');
    const newTime = +(moment().tz(time_zone).format('HH').split(' ')) + 0.1;   
    
    let timeOfDay = 
      (12 > newTime && newTime > 6) ? 'morning' : 
      (18 > newTime && newTime > 12) ? 'day' :  
      (24 > newTime && newTime > 18) ? 'evening' : 
      (6 > newTime && newTime > 0) ? 'night' : '';
    
    await this.getRandomImage(timeOfDay);
  }

  switchLang = async (e) => {
    const setLang = document.getElementById('set-lang');
    document.getElementById('ul').style.maxHeight = '0px';
    setLang.style.borderRadius = '.5rem';
    const newLang = e.target.id;
    const settlement = document.getElementById('city').innerText.split(',')[0];
    setLang.innerHTML = newLang === 'en' ? 'EN' : 'RU';
    const {town, country} = await this.apiService.getCoords(settlement, newLang);
    this.apiService.btnStyles();
    this.setState({
      city: town,
      country: country,
      lang: newLang
    })
  }

  getDegrees = (e) => {
    const degreeType = e.target.id.slice(0,-7);
    const fahrenheitButton = document.getElementById('fahrenheit-button');
    const celsiusButton = document.getElementById('celsius-button');
    
    if (degreeType === 'fahrenheit') {
        fahrenheitButton.style.background = 'rgba(76,82,85,.7)';
        celsiusButton.style.background = 'black';
        fahrenheitButton.style.cursor = 'auto';
        celsiusButton.style.cursor = 'pointer';
        this.setState({
          celsius: false,
          cDisabled: false,
          fDisabled: true
        })
    } else {
        celsiusButton.style.background = 'rgba(76,82,85,.7)';
        fahrenheitButton.style.background = 'black';
        fahrenheitButton.style.cursor = 'pointer';
        celsiusButton.style.cursor = 'auto';
        this.setState({
          celsius: true,
          cDisabled: true,
          fDisabled: false
        })
    }
  }

  componentDidMount() { this.getContent('Minsk') }

  render() {
    const state = this.state;
    const load = this.state.load;
    const error = this.state.error;
    const createContent = load && !error;

    const errorBlock = error ? <Error lang={this.state.lang} /> : null;
    const spinner = !load ? <Loading /> : null;
    const content = createContent ?  
    <Main
      state = {state}
      imgMethod = {this.changeImage} 
      langMethod = {this.switchLang} 
      degreeMethod = {this.getDegrees} 
      weatherMethod = {this.gettingWeather} 
      voiceSearch = {this.voiceSearch}

     /> : null; 

    return (
      <div id="common-wrapper" className="common-wrapper">
        {errorBlock}
        {spinner}
        {content}
      </div>  
    )
  }
}

class Main extends React.Component {
  render() {
    const state = this.props.state;
    return (
      <React.Fragment>
        <div id="content-wrapper">
          <header className="header">
            <p id="error">sdfsdfsdfsdfsdf</p>
            <Setting 
              icon = {state.icon}
              imgMethod = {this.props.imgMethod} 
              langMethod = {this.props.langMethod} 
              degreeMethod = {this.props.degreeMethod}
              cDisabled = {state.cDisabled}
              fDisabled = {state.fDisabled}
              loading = {state.loading}
            />
            <Form 
              icon = {state.icon}
              weatherMethod = {this.props.weatherMethod} 
              lang = {state.lang} 
              voiceSearch = {this.props.voiceSearch}
            />
          </header>
          <div className="main">
            <div className="weather">
              <Weather 
                icon = {state.icon}
                temp = {state.temp}
                city = {state.city}
                country = {state.country}
                weather = {state.weather}
                feels_like = {state.feels_like}
                wind = {state.wind}
                humidity = {state.humidity}
                celsius = {state.celsius}
                time_zone = {state.time_zone}
                lang = {state.lang}
              />
              <Forecast
                icon = {state.icon}
                forecast = {state.forecast}
                celsius = {state.celsius}
                lang = {state.lang}
              />
            </div>
            <div id="map" className="map">
              <Map
                lng = {state.lng}
                lat = {state.lat} 
                zoom = {state.zoom}
                lang = {state.lang}
              /> 
            </div>
          </div>
        </div>  
      </React.Fragment>
    );
  }
}

export default App;
