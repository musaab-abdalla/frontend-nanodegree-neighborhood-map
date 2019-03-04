import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'

class ListLocations extends Component {
  state = {
    open: false,
    query: ''
  }

  updateQuery = newQuery => {
    this.setState({ query: newQuery })
    this.props.filterLocations(newQuery)
  }

  render() {
    return (
      <Drawer className="side--drawer" open={this.props.open} onClose={this.props.toggleDrawer}>
        <div className="side__drawer" style={{ width: '240px' }}>
          <input
            type="text"
            aria-label="Filter list locations"
            placeholder="Filter Locations"
            name="filter"
            className="side__drawer--filter"
            onChange={e => this.updateQuery(e.target.value)}
            value={this.state.query}
          />
          <ul>
            {this.props.locations &&
              this.props.locations.map((loc, index) => {
                return (
                  <li key={index}>
                    <button
                      key={index}
                      className="side__drawer--item"
                      onClick={e => this.props.onButtonClick(loc.name)}>
                      {loc.name}
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
      </Drawer>
    )
  }
}

export default ListLocations
