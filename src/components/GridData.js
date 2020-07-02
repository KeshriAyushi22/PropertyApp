import React, { Component } from 'react'
import ResponsiveDrawer from "./HomePage";
import { Card } from '@material-ui/core';
import "../css/GridData.css"
import { activeLastBreadcrumb } from "../services/util"
import PropertyDetail from "./PropertyDetail";
import ImageSlider from "./ImageSlider"
import ContactDetail from "./ContactDetail"


export default class GridData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tile: this.props.location.state.tile
        }
    }


    handleClick = (event) => {
        event.preventDefault();
        this.props.history.push("/")
    }


    render() {
       
        return (

            <ResponsiveDrawer ref={this.test}>
                <div className="breadcrumb">
                    {activeLastBreadcrumb(["Home", this.state.tile.title, ""], this.handleClick)}
                </div>

                <div className="address">{this.state.tile.title}</div>
                <div className="carousel">
                    <ImageSlider {...this.props} />
                </div>
                <div className="dataGrid">
                    <Card className="priceGrid">
                        <PropertyDetail tile={this.state.tile} />
                    </Card >
                    <Card className="contactGrid">
                        <ContactDetail tile={this.state.tile}/>
                    </Card >
                </div >

            </ResponsiveDrawer>
        )
    }
}
