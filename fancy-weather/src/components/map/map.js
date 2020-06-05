import React from 'react';
import './map.css';

import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY29yYmVuZGFsbGFzIiwiYSI6ImNrYXRsY2lyYTBtaGUyeWwycmVvY3NqOTUifQ.RMnyV0u_LjUodKwFaBHsYw';

class Map extends React.Component {

  newMap = () => {
    new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });
  }
  
  componentDidUpdate() {  this.newMap()  }
    
  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}

export default Map;