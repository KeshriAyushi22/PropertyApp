import React from 'react';
import Route from 'react-router-dom/Route';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import SecondPage from "./SecondPage"
import FirstPage from "./FirstPage"

export default class App extends React.Component {
    render() {
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
