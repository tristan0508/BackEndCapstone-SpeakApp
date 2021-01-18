import React, { Fragment } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <Fragment>
      <Switch>
      <Router>
        <UserProvider>
          <Header />
          <Dashboard />
        </UserProvider>
      </Router>
      </Switch>
    </Fragment>
  );
}

export default App;
