import React, {useEffect} from 'react';
import { HashRouter as Router, Route} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import ItDepartment from "./pages/ItDepartment";
import {getPages} from "./components/posts/postsSlice";
import {useAppDispatch} from "./app/hooks";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        //dispatch(getPages());
    });

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
