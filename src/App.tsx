import React from 'react';
import { HashRouter as Router, Route} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import ItDepartment from "./pages/ItDepartment";

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/it" component={ItDepartment} />
            </Router>
        </div>
    );
}

export default App;
