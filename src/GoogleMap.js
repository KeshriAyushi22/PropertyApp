/* global google */
import React from "react";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

const MarkersList = props => {
  const { locations, ...markerProps } = props;
  return (
    <span>
      {locations.map((location, i) => {
        return (
          <Marker
            key={i}
            {...markerProps}
            position={{ lat: location.lat, lng: location.lng }}
          />
        );
      })}
    </span>
  );
};

class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      locations: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleMapClick = (ref, map, ev) => {
    console.log(this._map);
    const location = ev.latLng;
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }));
      this._map.panTo(location);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          ref={(map) => this._map = map}
          className={"map"}
          zoom={this.props.zoom}
          zoomControlOptions= {{
              position: window.google.maps.ControlPosition.LEFT_CENTER
          }}
          initialCenter={this.props.center}
          center={this.props.latlong}
          onClick={this.handleMapClick}
        >
         <MarkersList locations={JSON.parse(localStorage.getItem(localStorage.getItem('context'))) ? JSON.parse(localStorage.getItem(localStorage.getItem('context'))) : []} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCIhrd4pSUGkVbBXJKKypkzbMQ1GDnQ-58",
  libraries: []
})(GoogleMapContainer);
