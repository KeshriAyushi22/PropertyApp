import React from 'react';
import Route from 'react-router-dom/Route';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import SecondPage from "./SecondPage"
import FirstPage from "./FirstPage"
import ResponsiveDrawer from "./HomePage";

export default class App extends React.Component {

    render() {
        localStorage.clear();
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
                <Route
                    path="/home"
                    exact
                    render={() => <ResponsiveDrawer />}
                />
            </BrowserRouter>
        )
    }

}
