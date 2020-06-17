import React from 'react';
import TextField from '@material-ui/core/TextField';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const GOOGLE_API_KEY = 'AIzaSyCIhrd4pSUGkVbBXJKKypkzbMQ1GDnQ-58';

const AutoCompleteSearchBox = compose(
    withProps(props => {
        return {
            ...props,
            googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
        };
    }),
    withScriptjs,
    lifecycle({
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
        },
    })
)(props => {
    return (
        <div data-standalone-searchbox="">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                onPlacesChanged={props.onPlacesChanged}
                bounds={props.boundSearch}
            >
                <TextField
                    label="Property Address" fullWidth placeholder="Canada Street 555" InputLabelProps={{ shrink: true }}
                />
            </StandaloneSearchBox>
        </div>
    );
});

export default AutoCompleteSearchBox;