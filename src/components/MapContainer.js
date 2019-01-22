import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

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
      >
        {this.props.locations &&
          this.props.locations.map((loc, index) => {
            return (
              <Marker
                id={loc.id}
                key={loc.id}
                index={index}
                title={loc.name}
                name={loc.name}
                address={loc.address}
                extendedAddress={loc.extended_address}
                position={{ lat: loc.location.lat, lng: loc.location.lon }}
                animation={this.props.google.maps.Animation.DROP}
              />
            );
          })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapContainer);
