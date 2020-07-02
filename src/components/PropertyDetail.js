import React, { Component } from 'react'
import { Typography, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Favorite, LocalHotel, Bathtub, Home } from '@material-ui/icons';
import "../css/GridData.css"
import { Paper } from "@material-ui/core";

export default class PropertyDetail extends Component {
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
                    <Typography variant="h4">
                        {tile.price}
                    </Typography>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <Favorite />
                        </IconButton>
                    </CardActions>
                </div>
                <CardContent style={{ display: "flex" }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ width: "35%" }}>
                        {tile.address}
                    </Typography>
                    <div style={{ display: "flex", width: "fit-content", margin: "10px", marginLeft: "auto" }}>
                        <div style={{ display: "grid", margin: "10px"}}>
                        <Paper elevation={0} style={{ display: "flex", margin: "10px", fontSize: "20px" }}>
                            {tile.count.bedroom}
                            <LocalHotel />  
                        </Paper>
                        <div>Bedroom</div>
                        </div>
                        <div style={{ display: "grid", margin: "10px"}}>
                        <Paper elevation={0} style={{ display: "flex", margin: "10px", fontSize: "20px" }}>
                            {tile.count.bathroom}
                            <Bathtub />
                        </Paper>
                        <div>Bathroom</div>
                        </div>
                        <div style={{ display: "grid", margin: "10px"}}>
                        <Paper elevation={0} style={{ display: "flex", margin: "10px", fontSize: "20px" }}>
                            <Home />
                        </Paper>
                        <div>Single Family</div>
                        </div>
                    </div>
                </CardContent>

            </React.Fragment>
        )
    }
}
