import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'
import locationMarker from '../img/location.png'
import locationSelected from '../img/location_selected.png'

const MAP_KEY = 'AIzaSyAf2w35NrC6a_XrDuvADvfWC7rs46t3Vuo'
class MapContainer extends Component {
  state = {
    map: null
  }

  mapReady = (props, map) => {
    // Save the map reference in state and prepare the location markers
    this.setState({ map })
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{
          lat: 35.7915,
          lng: -78.7811
        }}
        center={this.props.selectedPlace.position}
        styles={this.props.styles}
        onClick={this.props.onInfoWindowClose}>
        {/* Iterate through the this.props.locations array and instantiate a new <Marker /> instance for each. */}
        {this.props.locations.map((loc, index) => {
          return (
            <Marker
              id={loc.id}
              key={loc.id}
              index={index}
              title={loc.name}
              name={loc.name}
              capacity={loc.capacity}
              address={loc.address}
              extendedAddress={loc.extended_address}
              url={loc.url}
              onClick={this.props.onMarkerClick}
              position={{
                lat: loc.location.lat,
                lng: loc.location.lon
              }}
              animation={!this.props.mapDropped ? this.props.google.maps.Animation.DROP : null}
              icon={this.props.selectedPlace.name === loc.name ? locationMarker : locationSelected}
            />
          )
        })}
        {/* <InfoWindow /> component can now handle callback actions when it's open or closed. */}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
          onClose={this.props.onInfoWindowClose}>
          <div>
            <h1>{this.props.activeMarker && this.props.activeMarker.name}</h1>
            <div>
              Capacity:{' '}
              {this.props.activeMarker && this.props.activeMarker.capacity > 0
                ? this.props.activeMarker.capacity
                : 'Not available'}
            </div>
            <address>
              {this.props.activeMarker && this.props.activeMarker.address}
              <br />
              {this.props.activeMarker && this.props.activeMarker.extendedAddress}
              <br />
              <a
                href={this.props.activeMarker && this.props.activeMarker.url}
                target="_blank"
                rel="noopener noreferrer">
                SeatGeek.com Web page
              </a>
            </address>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_KEY
})(MapContainer)
