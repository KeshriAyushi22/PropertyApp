import React, { Component } from 'react'
import {Loader, LoaderOptions} from 'google-maps';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
  };
export class GoogleMap extends Component {
    
    render() {
        return (
            <div>
           <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey:"google_key"
  })(GoogleMap);