import React, { Component } from 'react'
import { Typography,  CardContent, CardActions, IconButton } from '@material-ui/core';
import { Favorite, LocalHotel, Bathtub, Home } from '@material-ui/icons';
import "../css/GridData.css"
import PaperComponent from "./PaperComponent"
import {Phone} from '@material-ui/icons';

export default class ContactDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tile: this.props.tile
        }
    }
    render() {
        const { tile } = this.state;
        
        return (
            <React.Fragment>
                <div style={{ display: "flex" }}>
                    <Typography variant="h5">
                        {tile.author}
                    </Typography>
                </div>
                 <CardContent style={{ display: "flex" }}>
                <CardActions disableSpacing>
                        <IconButton aria-label="phone">
                            <Phone />
                        </IconButton>
                    </CardActions>
                    <Typography variant="body2" color="textSecondary" component="p" 
                    style={{verticalAlign: "middle",alignItems: "center",margin: "5px",padding: "10px"}}>
                        {tile.phoneNo}
                    </Typography>
                </CardContent> 
                
                </React.Fragment>
        )
    }
}
