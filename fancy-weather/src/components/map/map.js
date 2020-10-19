import React from 'react';
import './map.css';
import MapLoading from './map-loading/map-loading';
import apiKeys from '../../services/apiKeys'
import mapboxgl from 'mapbox-gl';

import t from '../../locales/lang';
 
mapboxgl.accessToken = apiKeys.map;

class Map extends React.Component {
  
  state = {
    mapLangChanched: false,
    lang: 'ru'
  }

  newMap = () => {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });    
  }

  langMap = (map, lang) => {
     this.map.on('load', () => {    
      map.getStyle().layers.forEach(function(thisLayer){
        if(thisLayer.id.indexOf('-label')>0){
          map.setLayoutProperty(thisLayer.id, 'text-field', ['get','name_' + lang])
        }
      });
      setTimeout(() => this.setState((state) => ({mapLangChanched: true})), 500)
    });
  }
  
  addMarker = () => {
    new mapboxgl.Marker()
    .setLngLat([this.props.lng, this.props.lat])
    .addTo(this.map);
  }

  coordsConversion = (coord) => {
    const sign = coord >= 0 ? '' : '-';
    const abs = Math.abs(coord)
    const degrees = Math.floor(abs);
    const minutes = (abs - degrees) * 60;
    const curtailedMinutes = Math.floor(minutes);
    return `${sign}${degrees}° ${curtailedMinutes}'`;
  }

  createMap() {
    if (this.props.lat) {
      this.newMap(); 
      this.addMarker(); 
      this.langMap(this.map, this.props.lang);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.lng !== nextProps.lng || 
    this.props.lang !== nextProps.lang ||
    this.state.mapLangChanched !== nextState.mapLangChanched
  }

  componentDidMount() {
    this.createMap()
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.lang !== state.lang || props.lng !== state.lng) {
      return {
        mapLangChanched: false,
        lang: props.lang,
        lng: props.lng
      };
    } else {
      return {
        mapLangChanched: true
      }
    }
  }
  
  componentDidUpdate(prevProps, prevState) { 
    if (this.props.lng !== prevProps.lng || this.props.lang !== prevProps.lang) {
      this.createMap()
    }
  }
    
  render() {
    const lat = this.coordsConversion(this.props.lat);
    const lng = this.coordsConversion(this.props.lng);
    const lang = t[this.props.lang];
    console.log(this.props.lng)
    console.log(this.state.lng)
    const vivsibility = this.state.mapLangChanched ? ' visible' : '';

    return (
      <div>
          <div >          
            <div id="map-wrapper" className="map-wrapper">
              {!vivsibility ? <MapLoading /> : null}
              <div ref={el => this.mapContainer = el} className={'map-container' + vivsibility} />
            </div>
            <div className="coords">
              <p>{lang['latitude']}: {lat}</p>
              <p>{lang['longitude']}: {lng}</p>
            </div>
          </div>
   
      </div>  
    )
  }
}

export default Map;

// import React from 'react';
// import './map.css';
// import apiKeys from '../../services/apiKeys';

// import t from '../../locales/lang';

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
// export class MapContainer extends React.Component {

//   coordsConversion = (coord) => {
//     const sign = coord >= 0 ? '' : '-';
//     const abs = Math.abs(coord)
//     const degrees = Math.floor(abs);
//     const minutes = (abs - degrees) * 60;
//     const curtailedMinutes = Math.floor(minutes);
//     return `${sign}${degrees}° ${curtailedMinutes}'`;
//   }

//   shouldComponentUpdate(nextProps) {
//     return this.props.lng !== nextProps.lng || this.props.lang !== nextProps.lang
//   }

//   render() {
//     const lat = this.props.lat;
//     const lng = this.props.lng;
//     const lang = t[this.props.lang];
//     return (
//       <div>
//         <div className="map-wrapper">
//           <Map 
//             google={this.props.google} zoom={14} className="map-container"
//             initialCenter={{
//               lat: lat,
//               lng: lng
//             }}
//           >
//               {/* <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} /> */}

//           </Map>
//         </div>
//         <div className="coords">
//           <p>{lang['latitude']}: {lat}</p>
//           <p>{lang['longitude']}: {lng}</p>
//         </div>
//       </div>
  
 
      
//     );
//   }
// }
 
// export default GoogleApiWrapper({
//   apiKey: apiKeys.googleMap,
//   language: "russian"
  
// })(MapContainer)

