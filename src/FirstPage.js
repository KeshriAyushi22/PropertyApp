import React, {Component} from 'react'
import {ListAltRounded, MenuRounded} from "@material-ui/icons";
import {Fab, TextField, Typography} from '@material-ui/core';
import GoogleMap from "./GoogleMap"

export default class FirstPage extends Component {
    render() {
        return (
            <div>
                <div className="header-2">
                    <MenuRounded fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                    <Typography
                        style={{ textAlign: "center", width: "fit-content", marginLeft: "auto", marginRight: "auto", color: 'white' }}
                        variant="h5" color="textSecondary">
                        <b>LOGO</b>
                    </Typography>
                    <ListAltRounded fontSize="large" color="action" style={{ verticalAlign: 'center', color: 'white' }} />
                </div>
                <div>
                <TextField
                            id="search"
                            name="search"
                            type="text"
                            defaultValue="Search"
                            onChange={(event) => console.log(event.target.value)}
                            fullWidth
                            style={{width:"100%",zIndex:"10",borderRadius:"15px"}}
                        />
                </div>
                <div className="googleMap">
                <GoogleMap/>
                </div>
                <div style={{ bottom: "22px",marginLeft: "auto",marginRight:"auto",width:"100%", position: 'fixed', 'justify-content': 'center'}}>
                <Fab variant="extended" href="/sp" 
                    style={{ backgroundColor: "red", color: 'white', fontSize: "12px", 'justify-content': 'center'}}>
                    POST YOUR AD
                 </Fab>
                 </div>
            </div>
        )
    }
}
