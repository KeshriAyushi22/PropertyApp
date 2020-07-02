import React, { Component } from 'react'
import ResponsiveDrawer from "./HomePage";
import { Card } from '@material-ui/core';
import "../css/GridData.css"
import { activeLastBreadcrumb } from "../services/util"
import PropertyDetail from "./PropertyDetail";
import ImageSlider from "./ImageSlider"
import ContactDetail from "./ContactDetail"
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
           
        },
    },
    breadcrumb: {
        height: '35px',
        padding: '10px'
    },
    address: {
        height: '45px',
        display: 'flex',
        textAlign: 'center',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px',
        fontSize: 'large',
        [theme.breakpoints.down('sm')]: {
            width: `fit-content !important`,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    dataGrid: {
        display: 'flex',
        height: '300px',
        padding: '20px',
        marginTop: '30px',
        [theme.breakpoints.down('sm')]: {
            width: `100% !important`,
            display: 'inline-grid',
            height: '466px'
        }

    },

    contactGrid: {
        width: '30%',
        padding: '30px',
        margin: '0px 10px 10px 20px',
        [theme.breakpoints.down('sm')]: {
            width: `100% !important`,
            padding: '30px',
            margin: '0px 10px 10px 10px',
        }
    },
    priceGrid: {
        width: '70%',
        padding: '30px',
        margin: '0px 10px 10px 10px',
        [theme.breakpoints.down('sm')]: {
            width: `100% !important`,

        }
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
        const { classes } = this.props;
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
                    <div className={classes.dataGrid}>
                        <Card className={classes.priceGrid}>
                            <PropertyDetail tile={this.state.tile} />
                        </Card >
                        <Card className={classes.contactGrid}>
                            <ContactDetail tile={this.state.tile} />
                        </Card >
                    </div >
                </div>
            </ResponsiveDrawer>
        )
    }
}

export default withStyles(useStyles)(GridData);
