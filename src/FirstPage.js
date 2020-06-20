import React, {Component} from 'react'
import {Fab, TextField} from '@material-ui/core';
import GoogleMapContainer from "./GoogleMap";

import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import ResponsiveDrawer from "./HomePage";
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    dynamicWidthPostButton: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px) !important`,
            height: '100px'
        },
    }
});

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    // componentWillMount() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             this.setState(prevState => ({
    //                 currentLocation: {
    //                     ...prevState.currentLocation,
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 }
    //             }));
    //             this.setState(prevState => ({
    //                 latlong: {
    //                     ...prevState.latlong,
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 }
    //             }));
    //             console.log(this.state.currentLocation);
    //         });
    //     }
    // }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState(prevState => ({
                    currentLocation: {
                        ...prevState.currentLocation,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }));
                this.setState(prevState => ({
                    latlong: {
                        ...prevState.latlong,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }));
                console.log(this.state.currentLocation);
            });
        }

        this.context = localStorage.getItem('context') ? localStorage.getItem('context') : 'Properties';
        console.log(this.context);
        localStorage.setItem('context', this.context);

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
                    latlong: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()}
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

    stanaloneSearcBox = () => {
        console.log(this.state);
        return (
            <StandaloneSearchBox
                ref={this.state.onSearchBoxMounted}
                onPlacesChanged={this.state.onPlacesChanged}
                bounds={this.state.boundSearch}
            >
                <TextField style={{width:"100%",zIndex:"10",borderRadius:"15px"}} fullWidth placeholder="Search"
                />
            </StandaloneSearchBox>
        );
    };

    render() {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         this.setState(prevState => ({
        //             currentLocation: {
        //                 ...prevState.currentLocation,
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //             }
        //         }));
        //         this.setState(prevState => ({
        //             latlong: {
        //                 ...prevState.latlong,
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //             }
        //         }));
        //         console.log(this.state.currentLocation);
        //     });
        // }
        const {classes} = this.props;
        return (
            <ResponsiveDrawer>
                <div>
                    <div data-standalone-searchbox="">
                        {this.stanaloneSearcBox()}
                    </div>
                    <div key={this.state.latlong} className="googleMap" style={{width: '100%', height: '100%'}}>
                        <GoogleMapContainer center={this.state.latlong} zoom={11} latlong={this.state.latlong} />
                    </div>
                    <div className={classes.dynamicWidthPostButton} style={{width: '100%', position: 'fixed', height: '50px', bottom: '20px'}}>
                        <div style={{ marginLeft: "auto",marginRight:"auto",width:"fit-content"}}>
                            <Fab variant="extended" href="/sp"
                                 style={{ backgroundColor: "red", color: 'white', fontSize: "12px"}}>
                                POST YOUR AD
                            </Fab>
                        </div>
                    </div>
                </div>
            </ResponsiveDrawer>
        )
    }
}

export default  withStyles(useStyles)(FirstPage);