import SimpleImageSlider from "react-simple-image-slider";
import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        width:'1400',
        [theme.breakpoints.down('sm')]: {
            width: `100% !important`
        },
    },
   
});

 class ImageSlider extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tile:this.props.location.state.tile
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <SimpleImageSlider 
                    width={'100%'}
                    height={300}
                    images={this.state.tile.propertyImage}
                    style={{padding:"0px",margin:"0px 0px"}}
                />
            </div>
        );
    }
}
export default  withStyles(useStyles)(ImageSlider);
