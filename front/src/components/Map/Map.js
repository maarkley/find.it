import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

import { Link } from 'react-router-dom'

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  function toggleMarkerInfoBox(id) {
    props.toggleMarkerInfoBox(id)
  }

  function mapClicked(e) {

      let placePosition = {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng())
      }
      let geocoder = new google.maps.Geocoder

      geocoder.geocode({'location': placePosition}, (results, status) => {
        if (status === 'OK') {
          let address = results[0].formatted_address

          props.mapClick(placePosition, address)

        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

  }
  return <GoogleMap onClick={mapClicked}
            defaultZoom={props.initialZoom}
            zoom={props.newZoom ? props.newZoom : props.initialZoom}
            center={props.newCenter ? props.newCenter : props.initialPosition}
            defaultCenter={props.initialPosition} >
            {props.markers.length > 0 && !props.addItemFormIsActive ? props.markers.map((item, key) => {
              let newPosition = {
                lat: parseFloat(item.coordinate.lat),
                lng: parseFloat(item.coordinate.lng)
              }
              
              return <div key={key}>
                          {item.showInfo ? <InfoBox  defaultPosition={new google.maps.LatLng(newPosition.lat, newPosition.lng)}
                                                  onCloseClick={toggleMarkerInfoBox.bind(this, item.slug)}
                                                  options={{ closeBoxURL: ``, enableEventPropagation: true }} >
                                            <div className="map-item-info-box">
                                              <div className="name">
                                                {item.name}
                                              </div>
                                              <div className="description">
                                                {item.description}
                                              </div>
                                              <Link to={"/zgloszenie/" + item.slug} className="more-btn">
                                                  wiecej >
                                              </Link>
                                            </div>
                                        </InfoBox> : null}

                        <Marker onClick={toggleMarkerInfoBox.bind(this, item.slug)} position={newPosition} icon={"/img/categories/map_markers/" + item.category.name + ".png"} />
                     </div>
            }) : null}

            {props.addItemFormIsActive ? <Marker position={props.addItemMarker.coords} onPositionChanged={check}/> : null}
          </GoogleMap>
  }

))

function check(e) {
  console.log('chcked: ', e)
}


export default MyMapComponent
