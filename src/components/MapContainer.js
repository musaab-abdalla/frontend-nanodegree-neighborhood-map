import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

const MAP_KEY = 'AIzaSyAf2w35NrC6a_XrDuvADvfWC7rs46t3Vuo';
class MapContainer extends Component {
  state = {
    map: null,
    markers: this.marker,
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  mapReady = (props, map) => {
    // Save the map reference in state and prepare the location markers
    this.setState({ map });
  };

  /*
  The onMarkerClick() is used to show the InfoWindow which is a component in the google-maps-react library which gives us the ability for a pop-up window showing details of the clicked place/marker.
  */
  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  };

  // The closeInfoWindow() is for closing the InfoWindow once a user clicks on the close button on the infoWindow.
  closeInfoWindow = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
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
        center={this.state.selectedPlace.position}
        styles={this.props.styles}>
        {/* Iterate through the this.props.locations array and instantiate a new <Marker /> instance for each. */}
        {this.props.locations.map((loc, index) => {
          return (
            <Marker
              id={loc.id}
              key={loc.id}
              index={index}
              name={loc.name}
              capacity={loc.capacity}
              address={loc.address}
              extendedAddress={loc.extended_address}
              url={loc.url}
              onClick={this.onMarkerClick}
              position={{
                lat: loc.location.lat,
                lng: loc.location.lon
              }}
            />
          );
        })}
        {/* <InfoWindow /> component can now handle callback actions when it's open or closed. */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            <h1>{this.state.activeMarker && this.state.activeMarker.name}</h1>
            <div>
              Capacity:{' '}
              {this.state.activeMarker && this.state.activeMarker.capacity > 0
                ? this.state.activeMarker.capacity
                : 'Not available'}
            </div>
            <address>
              {this.state.activeMarker && this.state.activeMarker.address}
              <br />
              {this.state.activeMarker && this.state.activeMarker.extendedAddress}
              <br />
              <a
                href={this.state.activeMarker && this.state.activeMarker.url}
                target="_blank"
                rel="noopener noreferrer">
                SeatGeek.com Web page
              </a>
            </address>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapContainer);
