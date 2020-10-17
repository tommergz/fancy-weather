import React from 'react';
import './app.css';
import Setting from '../setting';
import Form from '../form';
import Weather from '../weather';
import Forecast from '../forecast';
import Map from '../map';
import Error from '../error';
import Loading from '../loading';
import UndefinedCity from '../undefined-city';
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
    backgroundStyle: {},
    buttonsDisabled: false,
    cDisabled: true,
    fDisabled: false,
    loading: true,
    undefinedCity: false,
    error: false
  }

  apiService = new apiService();

  getRandomImage = async (time) => {
    try {
      const imageUrl = await this.apiService.getImage(time);
      if (imageUrl) {
        let img = new Image();

        img.onload = () => {
          const wrapperStyle = {
            backgroundSize: 'cover',
            backgroundImage: `url(${imageUrl})`
          }
          
          if (!this.state.load) { 
            document.body.classList.remove('loading'); 
            this.setState({
              backgroundStyle: wrapperStyle,
              load: true,
              loading: false
            })
          }
          else {
            this.setState({
              backgroundStyle: wrapperStyle,
              buttonsDisabled: false,
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
      this.setState({
        load: true,
        loading: false,
        buttonsDisabled: false
      })
    }
  }

  getContent = async (city) => {
    this.setState({
      loading: true,
      buttonsDisabled: true
    })
    const lang = this.state.lang;
    // const mic = document.getElementById('mic');
    // if (mic) {
    //   mic.classList.remove('mic-animation');
    // }
    try {
      
      const {town, country, lat, lng, time_zone} = await this.apiService.getCoords(city, lang);

      if (!town) {
        this.setState({
          buttonsDisabled: true,
          undefinedCity: true
        })
        setTimeout(() => this.setState({
          buttonsDisabled: false,
          undefinedCity: false
        }), 1500);
        return;
      }

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
          buttonsDisabled: false,
          error: false
        };
        return newState
      })
    } catch(err) {
      console.log(err.message)
      if (err.message === `Cannot read property 'formatted' of undefined`) {
        this.setState({
          buttonsDisabled: false
        })
      } else {
        this.setState({
          error: true,
          load: true,
          buttonsDisabled: false
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
    this.setState({
      buttonsDisabled: true
    })
    const city = this.state.city;

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

  switchLang = async (lang) => {
    const currentTown = this.state.city;
    const {town, country} = await this.apiService.getCoords(currentTown, lang);
    this.setState({
      city: town,
      country: country,
      lang: lang,
      langSetting: false
    })
  }

  switchToEnglish = () => {
    this.switchLang('en')
  }

  switchToRussian = () => {
    this.switchLang('ru')
  }

  degreeMethod = (e) => {
    const degreeType = this.state.celsius ? 'fahrenheit' : 'celsius';
    
    if (degreeType === 'fahrenheit') {
      this.setState({
        celsius: false,
        cDisabled: false,
        fDisabled: true
      })
    } else {
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
      switchToEnglish = {this.switchToEnglish}
      switchToRussian = {this.switchToRussian} 
      degreeMethod = {this.degreeMethod} 
      weatherMethod = {this.gettingWeather} 
      voiceSearch = {this.voiceSearch}

     /> : null; 

    return (
      <div id="common-wrapper" className="common-wrapper" style={state.backgroundStyle}>
        <div className='blackout'>
          {errorBlock}
          {spinner}
          {content}
        </div>
      </div>  
    )
  }
}

class Main extends React.Component {
  render() {
    const state = this.props.state;
    const chostCity = state.undefinedCity ? <UndefinedCity lang = {state.lang} /> : null;
    return (
      <React.Fragment>
        <div id="content-wrapper">
          <header className="header">
            {chostCity}
            <Setting 
              icon = {state.icon}
              imgMethod = {this.props.imgMethod} 
              lang = {state.lang}
              switchToEnglish = {this.props.switchToEnglish}
              switchToRussian = {this.props.switchToRussian} 
              degreeMethod = {this.props.degreeMethod}
              buttonsDisabled = {state.buttonsDisabled}
              celsius = {state.celsius}
              cDisabled = {state.cDisabled}
              fDisabled = {state.fDisabled}
              loading = {state.loading}
            />
            <Form 
              icon = {state.icon}
              weatherMethod = {this.props.weatherMethod} 
              lang = {state.lang} 
              buttonsDisabled = {state.buttonsDisabled}
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
