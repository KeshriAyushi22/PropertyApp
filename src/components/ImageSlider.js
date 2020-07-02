import SimpleImageSlider from "react-simple-image-slider";
import React, { Component } from 'react'

export default class ImageSlider extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tile:this.props.location.state.tile
        }
    }
    render() {
        return (
            <div>
                <SimpleImageSlider
                    width={1300}
                    height={300}
                    images={this.state.tile.propertyImage}
                    style={{padding:"10px",margin:"5px 10px"}}
                />
            </div>
        );
    }
}