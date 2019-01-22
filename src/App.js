import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer';

const SG_CLIENT_ID = 'MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw';
const SG_CLIENT_SECRET = 'e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54';
class App extends Component {
  state = {
    lat: 35.7915,
    lon: -78.7811,
    zoom: 11,
    venues: []
  };

  componentDidMount = () => {
    this.getLocations();
  };
  // fetch to retrieve data from SeatGeekAPI;
  // https://api.seatgeek.com/2/venues?client_id=MTQ3MjUzMTB8MTU0NjU3MTc4MC40Nw&client_secret=e46d8581d98202b201fa3e83c35d2ea4fc661d1a48f78daf322dff0dbded6d54&geoip=true&range=20mi&state=NC&per_page=20
  getLocations = () => {
    const endPoint = 'https://api.seatgeek.com/2/venues?';
    const parameters = {
      client_id: SG_CLIENT_ID,
      client_secret: SG_CLIENT_SECRET,
      state: 'NC',
      geoip: true,
      range: '20mi',
      per_page: 20
    };
    fetch(endPoint + new URLSearchParams(parameters))
      .then(res => res.json())
      .then(data => this.setState({ venues: data.venues }))
      .catch(error => {
        alert('SeatGeek data could not be retrieved ' + error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App=logo">
            <h1>Neighborhood Map</h1>
          </div>
        </header>
        <MapContainer
          lat={this.state.lat}
          lon={this.state.lon}
          google={this.props.google}
          zoom={this.state.zoom}
          locations={this.state.venues}
        />
      </div>
    );
  }
}

export default App;
