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
    console.log(props);
    return (
        <span>
      {locations.map((location, i) => {
          return (
              <Marker
                  key={i}
                  {...markerProps}
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={() => props.onClick([location.lat, location.lng])}
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
                        locations={localStorage.getItem(localStorage.getItem('context')) ? JSON.parse(localStorage.getItem(localStorage.getItem('context'))) : []}
                        icon = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2238%22%20height%3D%2238%22%20viewBox%3D%220%200%2038%2038%22%3E%3Cpath%20fill%3D%22%23ff0000%22%20stroke%3D%22%23ccc%22%20stroke-width%3D%22.5%22%20d%3D%22M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z%22%2F%3E%3Ctext%20transform%3D%22translate%2819%2018.5%29%22%20fill%3D%22%23fff%22%20style%3D%22font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E20%3C%2Ftext%3E%3C%2Fsvg%3E"
                        onClick = {this.props.onClickMarker}
                    />
                </Map>
            </div>
        );
    }
}

export default  withStyles(useStyles)(GoogleApiWrapper({
    apiKey: "AIzaSyCIhrd4pSUGkVbBXJKKypkzbMQ1GDnQ-58",
    libraries: []
})(GoogleMapContainer));
