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
  _isMounted = false
  state = {
    venues: [],
    filtered: null,
    isLoading: false,
    error: null,
    mapDropped: false,
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    styles: styles,
    open: false
  }

  componentDidMount = () => {
    // Check if the component is still mounted
    this._isMounted = true
    // Fetch to retrieve data from SeatGeek;
    fetch(endPoint + new URLSearchParams(parameters))
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          // Throwing an error when response doesn’t match expected data
          throw new Error('Something went wrong ...')
        }
      })
      .then(data => {
        if (this._isMounted) {
          this.setState({
            venues: data.venues,
            isLoading: false,
            filtered: this.filterLocations(data.venues, '')
          })
        }
      })
      // Handle errors
      .catch(error => this.setState({ error, isLoading: false }))
  }

  componentWillUnmount() {
    // Avoid an unnecessary state update
    this._isMounted = false
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
  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      mapDropped: true
    })
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
    // Show the error message when response doesn’t match expected data
    const { isLoading, error } = this.state
    if (error) {
      return <p>{error.message}</p>
    }

    if (isLoading) {
      return <p>Loading ...</p>
    }
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <button onClick={this.handleDrawerToggle} aria-label="Open drawer">
              <i className="fa fa-align-left" aria-hidden="true" />
            </button>
            <h1>City Events</h1>
          </div>
        </header>
        <ListLocations
          open={this.state.open}
          toggleDrawer={this.handleDrawerToggle}
          locations={this.state.filtered}
          filterLocations={this.updateQuery}
          onButtonClick={this.onButtonClick}
        />
        <main className="App-main">
          <section className="map-container">
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
          </section>
        </main>
      </div>
    )
  }
}

export default App
