import React, {Component} from 'react'
import {ListAltRounded, MenuRounded} from "@material-ui/icons";
import {Fab, TextField, Typography} from '@material-ui/core';
import GoogleMapContainer from "./GoogleMap";

import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentDidMount() {
        const refs = {};

        this.setState({
            places: [],
            searchText: '',
            error: null,
            onSearchBoxMounted: ref => {
                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                this.setState({
                    places,
                    searchText: '',
                    latlong: {
                        lat: places[0].geometry.location.lat(),
                        lng: places[0].geometry.location.lng()
                    }
                });
                console.log(places[0].geometry.location.lat());
                console.log(places[0].geometry.location.lng());
            },
        });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: this.props.placeName }, (results, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                const lngs = results[0].geometry.bounds.j;
                const lats = results[0].geometry.bounds.l;
                this.setState({
                    boundSearch: new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(lats.l, lngs.l),
                        new window.google.maps.LatLng(lats.j, lngs.j)
                    ),
                });
            } else {
                this.setState({
                    error: status,
                });
            }
        });
    }

    render() {

        return (
            <div>
                <div className="header-2">
                    <MenuRounded fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                    <Typography
                        style={{ textAlign: "center", width: "fit-content", marginLeft: "auto", marginRight: "auto", color: 'white' }}
                        variant="h5" color="textSecondary">
                        <b>LOGO</b>
                    </Typography>
                    <ListAltRounded fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                </div>
                <div data-standalone-searchbox="">
                    <StandaloneSearchBox
                        ref={this.state.onSearchBoxMounted}
                        onPlacesChanged={this.state.onPlacesChanged}
                        bounds={this.state.boundSearch}
                    >
                        <TextField style={{width:"100%",zIndex:"10",borderRadius:"15px"}} fullWidth placeholder="Search"
                        />
                    </StandaloneSearchBox>
                </div>
                <div className="googleMap" style={{width: '100%', height: '100%'}}>
                    <GoogleMapContainer center={{ lat: -1.2884, lng:36.8233 }} zoom={11} latlong={this.state.latlong} />
                </div>
                <div style={{position: 'fixed', width: '100%', height: '50px', bottom: '20px'}}>
                <div style={{ marginLeft: "auto",marginRight:"auto",width:"fit-content"}}>
                    <Fab variant="extended" href="/home"
                        style={{ backgroundColor: "red", color: 'white', fontSize: "12px"}}>
                        POST YOUR AD
                     </Fab>
                 </div>
                </div>
            </div>
        )
    }
}
