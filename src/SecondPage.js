import React, {Component} from 'react'
import './App.css'
import {KeyboardBackspace, PhotoLibrary} from "@material-ui/icons";
import {Button, TextField, Typography} from '@material-ui/core';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {Link} from "react-router-dom";

export default class SecondPage extends Component {
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

    handleClick = event => {
        document.getElementById('hiddenFileInput').click();
    };
    handleChange = event => {
        const fileUploaded = event.target.files[0];
        // props.handleFile(fileUploaded);
    };

    render() {
        const pls = this.state;
        return (
            <div>
                <div className="header-2">
                    <KeyboardBackspace fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                    <Typography
                        style={{ textAlign: "center", width: "fit-content", marginLeft: "auto", marginRight: "auto", color: 'white' }}
                        variant="h5" color="textSecondary">
                        <b>LOGO</b><span style={{color: 'red'}}>.....</span>
                    </Typography>
                </div>
                <div style={{ width: "100%" , display:"grid"}}>
                    
                    <input id="myInput" label ="my selected image" type="file" ref={(ref) => this.myInput = ref}
                     style={{ display: 'none' ,width: "187px",marginLeft: "auto",marginRight: "auto",marginTop: "20px"}} />
                    <PhotoLibrary
                        onClick={this.handleClick}
                        fontSize="large" color="action"
                        style={{ marginLeft: "auto", marginRight: "auto", width: "320px", marginTop: "20px", cursor:"pointer",color:"red" }} />

                    <Typography
                        style={{ textAlign: "center", width: "100%", color:"red" }}
                        variant="body2">
                        <b>Add a Photo</b>
                    </Typography>

                    <input type="file"
                           id="hiddenFileInput"
                           onChange={this.handleChange}
                           style={{display:'none'}}
                    />

                </div>
                <div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <div data-standalone-searchbox="">
                            <StandaloneSearchBox
                                ref={this.state.onSearchBoxMounted}
                                onPlacesChanged={this.state.onPlacesChanged}
                                bounds={this.state.boundSearch}
                            >
                                <TextField
                                    label="Property Address" fullWidth placeholder="Canada Street 555" InputLabelProps={{ shrink: true }}
                                />
                            </StandaloneSearchBox>
                        </div>
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <TextField
                            id="propTtile"
                            label="Property Title"
                            placeholder="Your property title"
                            name="propTtile"
                            type="text"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <TextField
                            id="propdesc"
                            label="Describe More About Your Property"
                            placeholder="Enter any notes here ..."
                            name="propdesc"
                            type="text"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows={2}
                            rowsMax={4}
                        />
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <Link to="/">
                            <Button
                                variant="contained"
                                style={{ verticalAlign: 'center', marginLeft: '9px', textAlign: "center", 'background-color': 'red', color: 'white' }}
                                type="button"
                                onClick={() => {
                                    console.log(pls.latlong);
                                    if (pls.latlong) {
                                        var tempMarker = localStorage.getItem('markers') ? JSON.parse(localStorage.getItem('markers')) : [];
                                        tempMarker.push(pls.latlong);
                                        localStorage.setItem('markers', JSON.stringify(tempMarker));
                                    }
                                }}
                            >
                                POST
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
