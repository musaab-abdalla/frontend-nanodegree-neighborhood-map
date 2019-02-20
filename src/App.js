import React, { Component } from 'react'
import './App.css'
import styles from './data/styles.json'
import MapContainer from './components/MapContainer'
import ListLocations from './components/ListLocations'

const SG_CLIENT_ID = 'MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw'
const SG_CLIENT_SECRET = 'e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54'
class App extends Component {
  state = {
    lat: 35.7915,
    lon: -78.7811,
    zoom: 11,
    venues: [],
    error: null,
    styles: styles,
    open: false
  }

  componentDidMount = () => {
    this.getLocations()
  }
  // fetch to retrieve data from SeatGeek;
  // https://api.seatgeek.com/2/venues?client_id=MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw&client_secret=e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54&lat=35.7915&lon=-78.7811&range=20mi&per_page=20
  getLocations = () => {
    const endPoint = 'https://api.seatgeek.com/2/venues?'
    const parameters = {
      client_id: SG_CLIENT_ID,
      client_secret: SG_CLIENT_SECRET,
      lat: this.state.lat,
      lon: this.state.lon,
      range: '20mi',
      per_page: 20
    }
    fetch(endPoint + new URLSearchParams(parameters))
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          // Throwing an error when response doesn’t match expected data
          throw new Error('Something went wrong ...')
        }
      })
      .then(data => this.setState({ venues: data.venues }))
      // Handle errors
      .catch(error => this.setState({ error }))
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    // Show the error message when response doesn’t match expected data
    const { lat, lon, venues, zoom, styles, error } = this.state
    if (error) {
      return <p>{error.message}</p>
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
          locations={venues}
        />
        <main className="App-main">
          <section className="map-container">
            <MapContainer lat={lat} lon={lon} zoom={zoom} locations={venues} styles={styles} />
          </section>
        </main>
      </div>
    )
  }
}

export default App
