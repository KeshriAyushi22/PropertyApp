import React, { Component } from 'react'
import { Typography, Card, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import "../css/GridData.css"

export default class propertyDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tile: this.props.tile
        }
    }
    render() {
        const { tile } = this.state;
        console.log(tile)
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
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ width: "30%" }}>
                        {tile.address}
                    </Typography>
                </CardContent>
                
                </React.Fragment>
        )
    }
}
