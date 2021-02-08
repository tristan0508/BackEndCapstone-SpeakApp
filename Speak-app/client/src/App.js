import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import RegisterPage from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { UserContext } from './providers/ContextProvider';
import { useParams } from "react-router";



export const App = () => {
  const { isLoggedIn, login } = useContext(UserContext)

  return (
  <div>
    
      <Switch>
          <Route exact path='/' >
              {!isLoggedIn ? <LoginPage login={login} /> : <Redirect to='/dashboard'/>}
         </Route>
          <Route exact path ='/register'>
              {!isLoggedIn ? <RegisterPage /> : <Redirect to='/dashboard'/>}
          </Route>

          <Route path={'/dashboard'} render={() => (
              <>
                  <Header />
                  <Route >
                      {isLoggedIn ? <Dashboard /> : <Redirect to='/'/>}
                  </Route>
                  <Route path={'/dashboard/chat/:id'}/>
              </>
          

          )}/>
          <Route>
              <Redirect to='/'/>
          </Route>
      </Switch>
      </div>
  )
}
