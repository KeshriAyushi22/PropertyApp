import React, { Component } from 'react'
import './App.css'
import { KeyboardBackspace, PhotoLibrary } from "@material-ui/icons";
import { Typography, Button, TextField, Link, Grid, } from '@material-ui/core';
import AutoComplete from "./AutoComplete"

export default class SecondPage extends Component {
    render() {
        return (
            <div>
                <div className="header-2">
                    <KeyboardBackspace fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                    <Typography
                        style={{ textAlign: "center", width: "fit-content", marginLeft: "auto", marginRight: "auto", color: 'white' }}
                        variant="h5" color="textSecondary">
                        <b>LOGO</b>
                    </Typography>
                </div>
                <div style={{ width: "100%" }}>
                    
                    <input id="myInput" type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} />
                    <PhotoLibrary
                        onClick={(e) => this.myInput.click()}
                        fontSize="large" color="action"
                        style={{ marginLeft: "auto", marginRight: "auto", width: "320px", marginTop: "20px", cursor:"pointer" }} />

                    <Typography
                        style={{ textAlign: "center", width: "100%" }}
                        variant="body2" color="textSecondary">
                        <b>Add a Photo</b>
                    </Typography>

                </div>
                <Grid container spacing={1} style={{ height: "450px", marginLeft: "20px", marginTop: "30px" }}>
                    <Grid items sm={12}>
                        <AutoComplete />
                    </Grid>
                    <Grid items sm={12}>
                        <TextField
                            id="propTtile"
                            label="Property Title"
                            name="propTtile"
                            type="text"
                            defaultValue="Your Property Tilte"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid items sm={12}>
                        <TextField
                            id="propdesc"
                            label="Describe More About Your Property"
                            name="propdesc"
                            type="text"
                            defaultValue="Enter Any Notes Here"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid items sm={12}>
                        <Button
                            variant="contained"
                            style={{ verticalAlign: 'center', marginLeft: '9px', textAlign: "center" }}
                            color="primary"
                            type="button"
                            onClick={() => window.location.href = "/"}
                        >
                            POST
		                </Button>
                    </Grid>

                </Grid>
            </div>
        )
    }
}
