import React from 'react'
import {
  InfoWindow
} from 'react-google-maps'
import {
  Row
} from 'reactstrap'

/**
 * Create infowindow for each Marker
 */
class InfoWindowLoad extends React.Component {

  render () {
    const date = new Date(1000*this.props.poi.Properties.time) // Convert the time data into a proper date type
    
    /* If infowindow is already visible it will not open again */
    if (!this.props.isVisible) {
      return null
    }
    return (
      <div>
          <InfoWindow onCloseClick={this.props.onClose}>
          <div>
            <Row>
              <label>Place:</label><span>{this.props.poi.Properties.place}</span>
            </Row>
            <Row>
              <label>Date:</label><span>{date.toString()}</span>
            </Row>
            <Row>
              <label>Magnitude:</label><span>{this.props.poi.Properties.mag}</span>
            </Row>
          </div>
        </InfoWindow>
      </div>
    )
  }
}

export default InfoWindowLoad
