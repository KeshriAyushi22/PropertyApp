import React, { Component } from 'react'
import ResponsiveDrawer from "./HomePage";
import { Card } from '@material-ui/core';
import "../css/GridData.css"
import { activeLastBreadcrumb } from "../services/util"
import PropertyDetail from "./PropertyDetail";
import ImageSlider from "./ImageSlider"
import ContactDetail from "./ContactDetail"
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            address:{
            width: `calc(100% - ${240}px) !important`,
            marginLeft: 'auto',
            marginRight: 'auto'
            }
        },
    },
    breadcrumb: {
        height: '35px',
        padding: '10px'
    },
    address:{
        height: '45px',
        display: 'flex',
        textAlign: 'center',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
        fontSize: 'large',
    },
    bottomDrawerTitle: {
        color: '#FFF',
    },
    bottomDrawerTitleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
});
 class GridData extends Component {

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
        const {classes} = this.props;
        return (

            <ResponsiveDrawer ref={this.test}>
                <div className={classes.root}>
                <div className={classes.breadcrumb}>
                    {activeLastBreadcrumb(["Home", this.state.tile.title, ""], this.handleClick)}
                </div>

                <div className={classes.address}>{this.state.tile.title}</div>
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
</div>
            </ResponsiveDrawer>
        )
    }
}

export default  withStyles(useStyles)(GridData);
