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
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
          <div className="list" style={{ width: '240px' }}>
            <input
              type="text"
              placeholder="Filter list"
              name="filter"
              onChange={e => this.updateQuery(e.target.value)}
              value={this.state.query}
            />
            <ul>
              {this.props.locations &&
                this.props.locations.map((loc, index) => {
                  return (
                    <li key={index}>
                      <button key={index} onClick={e => this.props.onButtonClick(loc.name)}>
                        <div>{loc.name}</div>
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default ListLocations
