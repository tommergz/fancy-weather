import React from 'react';
import './map.css';

import mapboxgl from 'mapbox-gl';
 
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
    return this.props.lng !== nextProps.lng
  }

  componentDidUpdate() {  
    this.newMap(); 
    this.addMarker() 
  }
    
  render() {
    const lat = this.coordsConversion(this.props.lat);
    const lng = this.coordsConversion(this.props.lng);
    return (
      <div>
        <div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
        <div className="coords">
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
        </div>
      </div>  
    )
  }

}

export default Map;