import React, { Component } from 'react'
import {MenuRounded, ListAltRounded } from "@material-ui/icons";
import { Typography, Button, TextField, Link, Grid, Fab } from '@material-ui/core';

export default class FirstPage extends Component {
    render() {
        return (
            <div>
            <div className="header-2">
                <MenuRounded fontSize="large" color="action" style={{ verticalAlign: 'center',color:'white' }} />
                <Typography
                    style={{ textAlign: "center", width: "fit-content" ,marginLeft: "auto", marginRight: "auto",color:'white'}}
                    variant="h5" color="textSecondary">
                    <b>LOGO</b>
                </Typography>
                <ListAltRounded fontSize="large" color="action" style={{ verticalAlign: 'center',color:'white' }} />
            </div>
            <Fab variant="extended" href="/sp" style={{backgroundColor:"red"}}>
       
        POST YOUR ADD
      </Fab>
            </div>
        )
    }
}
