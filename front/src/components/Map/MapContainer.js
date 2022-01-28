import React from 'react'
import Map from './Map'
import keys from '../../config'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import * as MapActions from '../../actions/Map.js'
import AddItemForm from '../AddItemForm'
import { GoogleMap } from 'react-google-maps'

class MapContainer extends React.Component {

  constructor() {
    super()
  }


  componentDidMount() {

    this.props.dispatch(MapActions.getAllReports())

  }

  toggleMarkerInfoBox(slug) {

    this.props.dispatch(MapActions.toggleMarkerInfoBox(slug))

  }

  render() {

    let mapState = this.props.map.addItemForm.addMarkerMode ? 'full' : ''
    let { currentReport, initialZoom, initialPosition } = this.props.map
    if ( currentReport.coordinate ) {
      console.log('it exists')
    } else {
      console.log('doesnt exist')
    }
    return  <div className={"map-outter-wrapper " + mapState}>
              <Map   googleMapURL={keys.googleUrl}
                      toggleMarkerInfoBox={this.toggleMarkerInfoBox.bind(this)}
                      loadingElement={<div className="google-map" />}
                      containerElement={ <div className="map-wrapper" />}
                      mapElement={<div className="google-map" />}
                      mapClick = {this.mapClick.bind(this)}
                      markers={this.props.map.markers}
                      userReports={this.props.map.userReports}
                      addItemFormIsActive={this.props.map.addItemForm.isActive}
                      addItemMarker={this.props.map.addItemForm.addMarker}
                      initialZoom={initialZoom}
                      newZoom={currentReport.name ? 16 : null}
                      newCenter={currentReport.name ? currentReport.coordinate : null}
                      initialPosition={initialPosition} />
            </div>

  }

  mapClick(placePosition, placeName) {
    let { addItemForm } = this.props.map
    if ( addItemForm.isActive && addItemForm.addMarkerMode ) {

      this.props.dispatch(MapActions.updateItemFormPlace({
        placePosition: placePosition,
        placeName: placeName
      }))
      this.props.dispatch(MapActions.addMarkerSelected())
    }
    
  }

}

module.exports = connect((state) => {
  return {
    map: state.map
  }
}, null, null, {
  pure: false
})(MapContainer)