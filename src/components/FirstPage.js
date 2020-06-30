import React, {Component} from 'react'
import {Fab, TextField, Drawer} from '@material-ui/core';
import GoogleMapContainer from "./GoogleMap";

import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import ResponsiveDrawer from "./HomePage";
import {withStyles} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {tileData} from "../services/propertyList"

import MyContext from './MyContext';

const useStyles = theme => ({
    dynamicWidthPostButton: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px) !important`,
            height: '100px'
        },
    },
    bottomDrawerRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width: '100%'
    },
    bottomDrawerGridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '100%'
    },
    bottomDrawerTitle: {
        color: '#FFF',
    },
    bottomDrawerTitleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
});



class FirstPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        // this.bottomDrawer = {
        //     ...props,
        //     open: false
        // };
        this.state = {
            ...props,
            openBottomDrawer: false
        };
        this.updateBottomDrawer = this.updateBottomDrawer.bind(this)
    }

    updateBottomDrawer(latlng){
        console.log(latlng);
        if (latlng) {
            this.setState({openBottomDrawer :true});
        }
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
            context: localStorage.getItem('context') ? localStorage.getItem('context') : 'Properties',
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

    stanaloneSearcBox = (con) => {
        console.log(con);
        return (
            <StandaloneSearchBox
                ref={this.state.onSearchBoxMounted}
                onPlacesChanged={this.state.onPlacesChanged}
                bounds={this.state.boundSearch}
            >
                <TextField id="mapSuggestionSearchTextField" style={{width:"100%",zIndex:"10",borderRadius:"15px"}} fullWidth placeholder={'Search '+con.context+' Category'}
                />
            </StandaloneSearchBox>
        );
    };

    onClickTile=(tile)=>{
        this.props.history.push
        ({
            pathname: "/property/"+tile.id+"/desc",
            state: { tile }
          })
    }

    render() {
        const {classes} = this.props;
        return (
            <ResponsiveDrawer ref={this.test}>
                <div key="firstPageMap">
                    <div data-standalone-searchbox="">
                        <MyContext.Consumer>
                            {(con) => this.stanaloneSearcBox(con)}
                        </MyContext.Consumer>
                    </div>
                    <div key={this.state.latlong} className="googleMap" style={{width: '100%', height: '100%'}}>
                        <GoogleMapContainer center={this.state.latlong} zoom={11} latlong={this.state.latlong} onClickMarker={(latlng) => this.updateBottomDrawer(latlng)} />
                    </div>
                    <div className={classes.dynamicWidthPostButton} style={{width: '100%', position: 'fixed', height: '50px', bottom: '20px'}}>
                        <div style={{ marginLeft: "auto",marginRight:"auto",width:"fit-content"}}>
                            <Fab variant="extended" href="/sp"
                                 style={{ backgroundColor: "red", color: 'white', fontSize: "12px"}}>
                                POST YOUR AD
                            </Fab>
                        </div>
                    </div>
                    <div style={{display: this.state.openBottomDrawer ? 'block' : 'none'}}>
                        <Drawer anchor='bottom' open={this.state.openBottomDrawer} onClose={() => this.setState({openBottomDrawer: false})}>
                            <div className={classes.bottomDrawerRoot}>
                                <GridList className={classes.bottomDrawerGridList} cols={2.5}>
                                    {tileData.map((tile) => (
                                        <GridListTile key={tile.img} onClick={() => this.onClickTile(tile)}>
                                            <img src={tile.img} alt={tile.title} />
                                            <GridListTileBar
                                                title={tile.title}
                                                classes={{
                                                    root: classes.bottomDrawerTitleBar,
                                                    title: classes.bottomDrawerTitle,
                                                }}
                                                actionIcon={
                                                    <IconButton aria-label={`star ${tile.title}`}>
                                                        <StarBorderIcon className={classes.bottomDrawerTitle} />
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </ResponsiveDrawer>
        )
    }
}

export default  withStyles(useStyles)(FirstPage);