import React from 'react';
import Route from 'react-router-dom/Route';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import SecondPage from "./components/SecondPage"
import FirstPage from "./components/FirstPage"
import ResponsiveDrawer from "./components/HomePage";

export default class App extends React.Component {

    render() {
        if (localStorage.getItem('context') && localStorage.getItem('context') !== undefined && localStorage.getItem('context') !== 'undefined') {
            // TODO: check later
        } else {
            localStorage.setItem('context', 'Properties');
        }
        return (
            <BrowserRouter>
                <Route
                    path="/sp"
                    exact
                    render={(props) => <SecondPage {...props} />}
                />
                 <Route
                    path="/"
                    exact
                    render={(props) => <FirstPage {...props} />}
                />
            </BrowserRouter>
        )
    }

}
