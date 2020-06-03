import React from 'react';
import './map.css';

import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY29yYmVuZGFsbGFzIiwiYSI6ImNrYXRsY2lyYTBtaGUyeWwycmVvY3NqOTUifQ.RMnyV0u_LjUodKwFaBHsYw';

class Map extends React.Component {
  
  componentDidMount() {

    const _this = this;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [_this.props.lng, _this.props.lat],
      zoom: _this.props.zoom
    });
    
  }

  componentDidUpdate() {
    const _this = this;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [_this.props.lng, _this.props.lat],
      zoom: _this.props.zoom
    });
    
  }
    
  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}

export default Map;