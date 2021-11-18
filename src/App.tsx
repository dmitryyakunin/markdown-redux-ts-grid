import React, {useEffect} from 'react';
import {HashRouter as Router, Route, RouteComponentProps} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import ItDepartment from "./pages/ItDepartment";
import {getPages, setCurDir} from "./components/posts/postsSlice";
import {useAppDispatch} from "./app/hooks";
import HrDepartment from "./pages/hrDepartment";

export interface HomeRouterProps {
    page: string;
    index: string;
}

export interface RouterProps extends RouteComponentProps<HomeRouterProps> { }

function App() {
/*    const dispatch = useAppDispatch();
    let currentPage: string[];

    useEffect(() => {
        getPageDir();
    }, [dispatch]);

    async function getPageDir() {
        let pages: any = await dispatch(getPages());
        let page: string = pages.payload.content;
        let dir: string[] = page.split('\r\n');
        currentPage = dir[0].split(':');
        await dispatch(setCurDir(currentPage[0]));
    }*/

    return (
        <div className="App">
            <Router>
                {/*<Route exact path="/:page" render={props => <Home {...props} />} />*/}

                <Route exact path="/:page/:index" component={Home} />
{/*                <Route exact path="/it" component={ItDepartment} />
                <Route exact path="/hr" component={HrDepartment} />*/}
            </Router>
        </div>
    );
}

export default App;
