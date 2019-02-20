import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'

class ListLocations extends Component {
  state = {
    open: false
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
          <div className="list" style={{ width: '240px' }}>
            <ul>
              {this.props.locations &&
                this.props.locations.map((loc, index) => {
                  return (
                    <li key={index}>
                      <button>
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
