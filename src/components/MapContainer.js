import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MAP_KEY = 'AIzaSyAf2w35NrC6a_XrDuvADvfWC7rs46t3Vuo';
class MapContainer extends Component {
  state = {
    map: null
  };

  componentDidMount = () => {};

  mapReady = (props, map) => {
    // Save the map reference in state and prepare the location markers
    this.setState({ map });
  };

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };
    // Cary - NC, by default
    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    };
    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={mapStyles}
        initialCenter={center}
        styles={this.props.styles}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapContainer);
