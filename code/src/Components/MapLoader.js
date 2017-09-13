import React from 'react'
import MarkerLoad from './MarkerLoad'

class MapLoader extends React.Component {
    constructor(props) {
        super(props)

        /* Set every infowindow state to false, which means it won't display until clicked. */
        let infoWindows = []
        props.featureList.map(feature => {
          infoWindows[feature.FeatureID] = false
        })

        this.state = {
          infoWindows,
        }
    
        this.closeInfoWindow = this.closeInfoWindow.bind(this)
        this.openInfoWindow = this.openInfoWindow.bind(this)
      }

      /**
      * Close the current infoWindow, set the state to false 
      */
      closeInfoWindow() {
        const infoWindows = Object.assign({}, this.state.infoWindows)
        Object.keys(this.state.infoWindows).map(id => {
          infoWindows[id] = false
        })
        this.setState({
          infoWindows,
        })
    
      }
      
      /**
       * Open the infowindow, capturing the {featureID} relevant to the clicked marker
       * 
       * @param {String} featureID 
       */
      openInfoWindow(featureID) {
        const infoWindows = Object.assign({}, this.state.infoWindows)
    
        Object.keys(this.state.infoWindows).map(id => {
          infoWindows[id] = (id === featureID)
        })
    
        this.setState({
          infoWindows,
        })
      }
    

      render() {
        return (
          <div>
            {
              this.props.featureList.map((feature, featureKey) => {
                return (
                  <MarkerLoad
                  poi={feature}
                  key={featureKey}
                  lng={feature[0]}
                  lat={feature[1]}
                  isInfoWindowVisible={(this.state.infoWindows[feature.FeatureID] === true)}
                  closeInfoWindow={this.closeInfoWindow}
                  openInfoWindow={this.openInfoWindow}
                  activeCollections={this.props.activeCollections}
                />
                )
              })
            }
          </div>
        )
      }
}

export default MapLoader
