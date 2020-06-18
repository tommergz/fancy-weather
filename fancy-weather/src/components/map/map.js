import React from 'react';
import './map.css';

import mapboxgl from 'mapbox-gl';
import t from '../../locales/lang';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY29yYmVuZGFsbGFzIiwiYSI6ImNrYXRsY2lyYTBtaGUyeWwycmVvY3NqOTUifQ.RMnyV0u_LjUodKwFaBHsYw';

class Map extends React.Component {
  
  map = '';

  newMap = () => {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });    
  }

  langMap = (map, lang) => {
    this.map.on('load', function() {    
      map.getStyle().layers.forEach(function(thisLayer){
            if(thisLayer.id.indexOf('-label')>0){
              map.setLayoutProperty(thisLayer.id, 'text-field', ['get','name_' + lang])
            }
        });
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

  shouldComponentUpdate(nextProps) {
    return this.props.lng !== nextProps.lng || this.props.lang !== nextProps.lang
  }

  componentDidUpdate() {  
    this.newMap(); 
    this.addMarker() 
    this.langMap(this.map, this.props.lang)
  }
    
  render() {
    const lat = this.coordsConversion(this.props.lat);
    const lng = this.coordsConversion(this.props.lng);
    const lang = t[this.props.lang];

    return (
      <div>
        <div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
        <div className="coords">
          <p>{lang['latitude']}: {lat}</p>
          <p>{lang['longitude']}: {lng}</p>
        </div>
      </div>  
    )
  }

}

export default Map;