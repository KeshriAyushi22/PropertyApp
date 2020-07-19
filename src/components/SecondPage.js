import React, { Component } from 'react'
import '../css/App.css'
import { PhotoLibrary } from "@material-ui/icons";
import { Button, TextField, Typography } from '@material-ui/core';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { Link } from "react-router-dom";
import ResponsiveDrawer from "./HomePage";
import { createPropertyDetail } from "../services/react_api"

export default class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            propTitle: "",
            propdesc: "",
            image: "",
            address: "",
            imageData: null
        };
    }


    componentDidMount() {
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
                    latlong: { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() }
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
        const fileUploaded = event.target.files;
        // props.handleFile(fileUploaded);
        console.log(fileUploaded)
        var reader = new FileReader();
        var data = new FormData();

        for (var i = 0; i < fileUploaded.length; i++) {
            let file = fileUploaded[i];
            console.log(file);
            data.append('file', file, file.name);
        }

        // reader.onload = function () {
        //     var dataURL = reader.result;
        //     console.log(dataURL)
        // };
        // reader.readAsDataURL(fileUploaded);
        this.setState({
            imageData: data
        });
        console.log(data.get('file'))
    };

    containsObject(obj, list) {
        for (let x in list) {
            if (list.hasOwnProperty(x) && list[x].lat === obj.lat && list[x].lng === obj.lng) {
                return true;
            }
        }

        return false;
    }

    selectImage=()=>{
        const objReq = {}
        objReq["address"] = this.state.address
        objReq["desc"] = this.state.propdesc
        objReq["title"] = this.state.propTitle
        objReq["image"] = this.state.image
        objReq["imageData"] = this.state.imageData

        console.log(objReq)
        let dbResult = createPropertyDetail(objReq);
        console.log(dbResult);
        // console.log(pls.latlong);
        // if (pls.latlong) {
        //     var tempMarker = localStorage.getItem(localStorage.getItem('context')) ? JSON.parse(localStorage.getItem(localStorage.getItem('context'))) : [];
        //     if (!this.containsObject(pls.latlong, tempMarker)) {
        //         tempMarker.push(pls.latlong);
        //     }

        //     localStorage.setItem(localStorage.getItem('context'), JSON.stringify(tempMarker));
        // }
    }

    render() {

        const pls = this.state;
        return (
            <ResponsiveDrawer>
                <div>
                    <div style={{ width: "100%", display: "grid" }}>

                        <input id="myInput" label="my selected image" type="file" ref={(ref) => this.myInput = ref}
                            style={{ display: 'none', width: "187px", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }} />
                        <PhotoLibrary
                            onClick={this.handleClick}
                            fontSize="large" color="action"
                            style={{ marginLeft: "auto", marginRight: "auto", width: "320px", marginTop: "20px", cursor: "pointer", color: "red" }} />

                        <Typography
                            style={{ textAlign: "center", width: "100%", color: "red" }}
                            variant="body2">
                            <b>Add a Photo</b>
                        </Typography>

                        <input type="file"
                            id="hiddenFileInput"
                            onChange={this.handleChange}
                            style={{ display: 'none' }}
                            multiple="multiple"
                            accept="image/x-png,image/jpeg"
                        />

                    </div>
                    <div>
                        <div style={{ margin: "15px", marginTop: "50px" }}>
                            <div data-standalone-searchbox="">
                                <StandaloneSearchBox
                                    ref={this.state.onSearchBoxMounted}
                                    onPlacesChanged={this.state.onPlacesChanged}
                                    bounds={this.state.boundSearch}
                                >
                                    <TextField id="address"
                                        label="Property Address" fullWidth placeholder="Canada Street 555" InputLabelProps={{ shrink: true }}
                                        onChange={(event) => this.setState({ [event.target.id]: event.target.value })}
                                    />
                                </StandaloneSearchBox>
                            </div>
                        </div>
                        <div style={{ margin: "15px", marginTop: "50px" }}>
                            <TextField
                                id="propTitle"
                                label="Property Title"
                                placeholder="Your property title"
                                name="propTitle"
                                type="text"
                                onChange={(event) => this.setState({ [event.target.id]: event.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div style={{ margin: "15px", marginTop: "50px" }}>
                            <TextField
                                id="propdesc"
                                label="Describe More About Your Property"
                                placeholder="Enter any notes here ..."
                                name="propdesc"
                                type="text"
                                onChange={(event) => this.setState({ [event.target.id]: event.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                multiline
                                rows={2}
                                rowsMax={4}
                            />
                        </div>
                        <div style={{ margin: "15px", marginTop: "50px" }}>
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    style={{ width: '125px', verticalAlign: 'center', marginLeft: '9px', textAlign: "center", backgroundColor: 'red', color: 'white' }}
                                    type="button"
                                    onClick={() => {
                                       this.selectImage();
                                    }}
                                >
                                    POST
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </ResponsiveDrawer>
        )
    }
}
