import React, { Component } from 'react'
import './App.css'
import { KeyboardBackspace, PhotoLibrary } from "@material-ui/icons";
import { Typography, Button, TextField, Link } from '@material-ui/core';
import AutoComplete from "./AutoComplete"

export default class SecondPage extends Component {
    render() {
        return (
            <div>
                <div className="header-2">
                    <KeyboardBackspace fontSize="large" style={{ verticalAlign: 'center', color: "white" }} />
                    <Typography
                        style={{ textAlign: "center", width: "100%", color: "white" }}
                        variant="h5">
                        <b>LOGO</b><span style={{color: 'red'}}>......</span>
                    </Typography>
                </div>
                <div style={{ width: "100%" }}>
                    <Link
                        onClick={() => {
                            console.log("clicked")
                        }}
                    >
                        <PhotoLibrary
                            fontSize="large"
                            style={{ marginLeft: "auto", marginRight: "auto", width: "100%", marginTop: "20px", color:"red" }} />
                    </Link>
                    <Typography
                        style={{ textAlign: "center", width: "100%", color:"red" }}
                        variant="body2">
                        <b>Add a Photo</b>
                    </Typography>

                </div>
                <div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <AutoComplete/>
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <TextField
                            id="propTtile"
                            label="Property Title"
                            placeholder="Your property title"
                            name="propTtile"
                            type="text"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <TextField
                            id="propdesc"
                            label="Describe More About Your Property"
                            placeholder="Enter any notes here ..."
                            name="propdesc"
                            type="text"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows={2}
                            rowsMax={4}
                        />
                    </div>
                    <div style={{margin: "15px", marginTop: "50px"}}>
                        <Button
                            variant="contained"
                            style={{ verticalAlign: 'center', marginLeft: '9px', textAlign: "center", 'background-color': 'red', color: 'white' }}
                            type="button"
                            onClick={()=>window.location.href="/"}
                        >
                            POST
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
