import React, { Component } from 'react'
import { MenuRounded, ListAltRounded } from "@material-ui/icons";
import { Typography, Button, TextField, Link, Grid, Fab } from '@material-ui/core';
import GoogleMapContainer from "./GoogleMap"
export default class FirstPage extends Component {
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
                <div>
                <TextField
                            id="search"
                            name="search"
                            type="text"
                            defaultValue="Search"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            style={{width:"100%",zIndex:"10",borderRadius:"15px"}}
                        />
                </div>
                <div className="googleMap">
                <GoogleMapContainer center={{ lat: -1.2884, lng:36.8233 }} zoom={14} />
                </div>
                <div style={{ marginTop: "420px",marginLeft: "auto",marginRight:"auto",width:"fit-content"}}>
                <Fab variant="extended" href="/sp" 
                    style={{ backgroundColor: "red", color: 'white', fontSize: "12px"}}>
                    POST YOUR AD
                 </Fab>
                 </div>
            </div>
        )
    }
}
