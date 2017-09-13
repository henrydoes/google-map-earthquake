import React, { Component } from 'react';
import {
    GoogleMap,
    withGoogleMap
  } from 'react-google-maps'
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import MapLoader from './MapLoader'

/**
 * Use an url to get data through JSON, returns the data.
 * 
 * @param {String} yourUrl 
 */
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
/**
 * Get data from JSON and allocate in object to be used for markers and infowindows
 * 
 * @param {Object} activeCollections 
 */
function getMarkerArray (activeCollections) {
    
    let featureList = []
    // Iterate through the object
    Object.keys(activeCollections).map(collectionKey =>{
      const features = activeCollections[collectionKey]
      Object.keys(features).map(featureKey => {
          if (features[featureKey].type === "Feature") {

            // Get the data needed for this project
            const feature = features[featureKey].geometry.coordinates
            const properties = features[featureKey].properties
            const featureID = featureKey

            // Allocate the data into a proper object for future use
            Object.assign(feature, {Properties: properties}, {FeatureID: featureID})
            featureList = [...featureList, feature]
          }
      })
    })
    return featureList
}

/**
 * Create the Core of the Google maps
 */
class Core extends Component  {
    render () {
        let json_obj = JSON.parse(Get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")); /* Get the data through json */       
        const featureList = getMarkerArray(json_obj)
        const MapRender = withScriptjs(withGoogleMap(props => (
            <GoogleMap
              zoom={6}
              defaultCenter={{lat: 12.9702856, lng: -56.998576}}
            >
              <MapLoader
               featureList = {props.featureList}
              />
            </GoogleMap>
          )))
        return (
            <MapRender
            googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.28&libraries=places,geometry&key=AIzaSyDBnjvdNVL9MzvDUmk3LOBRqGFNjKWOqHU'
            containerElement={
              <div style={{height: "100%", width: "100%", position: "absolute", hidden: "none"}}/>
            }
            mapElement={
              <div style={{height: "100%", width: "100%", position: "absolute", hidden: "none"}}/>
            }
            loadingElement={
              <div style={{height: "100%", width: "100%", position: "absolute", hidden: "none"}}/>
            }
            featureList={featureList}
          />
        )
    }
}

export default Core
