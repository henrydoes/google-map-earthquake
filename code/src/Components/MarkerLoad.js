import React from 'react'
import {
  Marker
} from 'react-google-maps'
import InfoWindowLoad from './InfoWindow'

/**
 * Create markers from each point of interest
 */
class MarkerLoad extends React.Component {

  render () {
    const feature = this.props.poi
    const parentCollection = feature.FeatureID
    return (
      <Marker
        defaultPosition={{lat:this.props.lat, lng:this.props.lng}}
        onClick={() => this.props.openInfoWindow(this.props.poi.FeatureID)}
      >
        <InfoWindowLoad
          activeCollections={this.props.activeCollections}
          isVisible={this.props.isInfoWindowVisible}
          onClose={this.props.closeInfoWindow}
          parentCollection={parentCollection}
          poi={this.props.poi}
        />
      </Marker>
    )
  }
}

export default MarkerLoad
