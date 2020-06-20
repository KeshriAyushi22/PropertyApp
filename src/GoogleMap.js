/* global google */
import React from "react";
import './App.css';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    map: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px) !important`,
            height: `calc(100% - ${96}px) !important`
        },
    }
});


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

const getCoordinatesForContext = () => {

}

class GoogleMapContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            locations: []
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="map-container">
                <Map
                    google={this.props.google}
                    ref={(map) => this._map = map}
                    className={classes.map}
                    zoom={this.props.zoom}
                    zoomControlOptions={{
                        position: window.google.maps.ControlPosition.LEFT_CENTER
                    }}
                    initialCenter={this.props.center}
                    center={this.props.latlong}
                >
                    <MarkersList
                        locations={localStorage.getItem(localStorage.getItem('context')) ? JSON.parse(localStorage.getItem(localStorage.getItem('context'))) : []}/>
                </Map>
            </div>
        );
    }
}

export default  withStyles(useStyles)(GoogleApiWrapper({
    apiKey: "API_KEY",
    libraries: []
})(GoogleMapContainer));
