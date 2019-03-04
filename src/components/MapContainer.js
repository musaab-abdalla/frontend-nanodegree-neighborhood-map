import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'
import locationMarker from '../img/location.png'
import locationSelected from '../img/location_selected.png'

const MAP_KEY = 'AIzaSyAf2w35NrC6a_XrDuvADvfWC7rs46t3Vuo'
class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null
    }
    this.mapReady = this.mapReady.bind(this)
  }

  componentDidUpdate = () => {}

  mapReady = (props, map) => {
    this.setState({ map: map })
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: 'calc(100% - 56px)',
      position: 'relative'
    }
    // Center the map such that it shows all markers and auto zoom
    const bounds = new this.props.google.maps.LatLngBounds()
    this.props.locations &&
      this.props.locations.map(location => {
        return bounds.extend(
          new this.props.google.maps.LatLng(location.location.lat, location.location.lon)
        )
      })
    return (
      <Map
        role="application"
        aria-label="map"
        className={'main__map'}
        onReady={this.mapReady}
        google={this.props.google}
        zoom={16}
        bounds={bounds}
        style={mapStyles}
        styles={this.props.styles}
        center={this.props.selectedPlace.position /* Center marker on the map onClock */}
        // styles={this.props.styles}
        onClick={this.props.onInfoWindowClose}>
        {/* Iterate through the this.props.locations array and instantiate a new <Marker /> instance for each. */}
        {this.props.locations &&
          this.props.locations.map((loc, index) => {
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
                icon={
                  this.props.selectedPlace.name === loc.name ? locationSelected : locationMarker
                }
              />
            )
          })}
        {/* <InfoWindow /> component can now handle callback actions when it's open or closed. */}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
          onClose={this.props.onInfoWindowClose}>
          <div className="map__iw">
            <h1>{this.props.activeMarker && this.props.activeMarker.name}</h1>
            <div className="map__iw--capacity">
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
                className="map__iw--link"
                href={this.props.activeMarker && this.props.activeMarker.url}
                target="_blank"
                rel="noopener noreferrer">
                {this.props.activeMarker && this.props.activeMarker.name} Upcoming Events
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
