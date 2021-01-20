import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from '../components/header/Header';
import Dashboard from '../components/dashboard/Dashboard';
import { UserContext } from '../providers/UserProvider';
import { Fragment } from "react";


const ApplicationsViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <Switch>
            <Route path="/dashboard">
                {isLoggedIn ?
                 <Fragment>
                     <Header/>
                     <Dashboard />
                 </Fragment> : 
                 <Redirect to='/' 
                 />}
            </Route>
             
        </Switch>
    )
}

export default ApplicationsViews;