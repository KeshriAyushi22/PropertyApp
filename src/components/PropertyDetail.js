import React, { Component } from 'react'
import { Typography, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Favorite, LocalHotel, Bathtub, Home } from '@material-ui/icons';
import "../css/GridData.css"
import "../css/PropertyDetail.css"
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
                <div className="property-detail">
                    <Typography variant="h4">
                        {tile.price}
                    </Typography>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <Favorite />
                        </IconButton>
                    </CardActions>
                </div>
                <CardContent className="card-content" >
                    <Typography variant="body2" color="textSecondary" component="p" style={{ width: "35%" }}>
                        {tile.address}
                    </Typography>
                    <div className="card-content-property-div">
                        <div className="property-desc" >
                        <Paper className="paper-display" elevation={0} >
                            {tile.count.bedroom}
                            <LocalHotel />  
                        </Paper>
                        <div>Bedroom</div>
                        </div>
                        <div className="property-desc" >
                        <Paper  className="paper-display" elevation={0} >
                            {tile.count.bathroom}
                            <Bathtub />
                        </Paper>
                        <div>Bathroom</div>
                        </div>
                        <div className="property-desc" >
                        <Paper className="paper-display" elevation={0} >
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
