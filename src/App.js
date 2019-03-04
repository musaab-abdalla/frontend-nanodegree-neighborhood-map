import React, { Component } from 'react'
import './App.css'
import styles from './data/styles.json'
import MapContainer from './components/MapContainer'
import ListLocations from './components/ListLocations'

const SG_CLIENT_ID = 'MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw'
const SG_CLIENT_SECRET = 'e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54'
// https://api.seatgeek.com/2/venues?client_id=MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw&client_secret=e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54&lat=35.7915&lon=-78.7811&range=20mi&per_page=20
const endPoint = 'https://api.seatgeek.com/2/venues?'
const parameters = {
  client_id: SG_CLIENT_ID,
  client_secret: SG_CLIENT_SECRET,
  lat: 35.7915,
  lon: -78.7811,
  range: '20mi',
  per_page: 20
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      venues: [],
      filtered: null,
      mapDropped: false,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      styles: styles,
      open: false
    }
  }

  componentDidMount = () => {
    // Fetch to retrieve data from SeatGeek;
    fetch(endPoint + new URLSearchParams(parameters))
      .then(response => {
        return response.json()
      })
      .then(data =>
        this.setState({
          venues: data.venues,
          filtered: this.filterLocations(data.venues, '')
        })
      )
      // Handle errors
      .catch(error => alert('SeatGeek failed to fetch data: ', error))
  }

  /*
  The onMarkerClick() is used to show the InfoWindow which is a component in
  the google-maps-react library which gives us the ability for a pop-up window
  showing details of the clicked place/marker.
  */
  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
      // Prevent markers from dropped again into a map
      mapDropped: true
    })
  }

  /*
  The closeInfoWindow() is for closing the InfoWindow once a user clicks on
  the close button on the infoWindow.
  */
  onInfoWindowClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        mapDropped: true
      })
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({
      open: !state.open,
      // Prevent markers from dropped again into a map when click drawer toggle.
      mapDropped: true
    }))
  }

  updateQuery = query => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.venues, query)
    })
  }

  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()))
  }

  onButtonClick = venueName => {
    document.querySelector(`[title="${venueName}"]`).click()
  }
  render() {
    return (
      <div className="wrapper">
        <header className="toolbar" role="banner">
          <nav className="toolbar__navigation">
            <div className="toolba__toggle-button">
              <button
                onClick={this.handleDrawerToggle}
                aria-label="Open drawer"
                className="toggle-button">
                <div className="toggle-button__line" />
                <div className="toggle-button__line" />
                <div className="toggle-button__line" />
              </button>
            </div>
            <div className="toolbar__logo">
              <a href="./">City Events</a>
            </div>
            <div className="spacer" />
            <div className="toolbar__navigation-items">
              <ul>
                <li>
                  <a href="/">All Locations from SeatGeek</a>
                </li>
              </ul>
            </div>
            <ListLocations
              open={this.state.open}
              toggleDrawer={this.handleDrawerToggle}
              locations={this.state.filtered}
              filterLocations={this.updateQuery}
              onButtonClick={this.onButtonClick}
            />
          </nav>
        </header>
        <main className="main" role="main">
          <MapContainer
            locations={this.state.filtered}
            activeMarker={this.state.activeMarker}
            selectedPlace={this.state.selectedPlace}
            showingInfoWindow={this.state.showingInfoWindow}
            styles={this.state.styles}
            mapDropped={this.state.mapDropped}
            onMarkerClick={this.onMarkerClick}
            onInfoWindowClose={this.onInfoWindowClose}
          />
        </main>
      </div>
    )
  }
}

export default App
