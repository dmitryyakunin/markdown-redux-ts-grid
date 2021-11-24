import React from 'react';
import {HashRouter as Router, Route, RouteComponentProps} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import Files from "./pages/Files";

export interface IHomeRouterProps {
    page: string;
    index: string;
    file: string;
}

export interface IRouterProps extends RouteComponentProps<IHomeRouterProps> { }

function App() {

    return (
        <div className="App">
            <Router>
                {/*<Route exact path="/:page" render={props => <Home {...props} />} />*/}

                <Route exact path="/" component={Home} />
                <Route exact path="/:page/:index" component={Home} />
                <Route exact path="/:page/:index/:file" component={Files} />
            </Router>
        </div>
    );
}

export default App;
