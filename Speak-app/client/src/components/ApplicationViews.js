import React, { useContext } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from '../components/header/Header';
import Dashboard from '../components/dashboard/Dashboard';
import { Fragment } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import UserContext from "../providers/UserContext";

const ApplicationsViews = () => {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <Switch>
            <Route exact path ='/'>
                {!isLoggedIn ? <LoginPage /> : <Redirect to='/dashboard'/>}
            </Route>
            <Route exact path ='/register'>
                {!isLoggedIn ? <RegisterPage /> : <Redirect to='/dashboard'/>}
            </Route>
            <Route path={'/dashboard'} render={() => (
                <Fragment>
                    <Header />
                    <Route >
                        {isLoggedIn ? <Dashboard /> : <Redirect to='/'/>}
                    </Route>
                    <Route path={'/dashboard/chat/:id'}/>
                </Fragment>


            )}/>
            <Route>
                <Redirect to='/'/>
            </Route>
        </Switch>
    )
}

export default ApplicationsViews;