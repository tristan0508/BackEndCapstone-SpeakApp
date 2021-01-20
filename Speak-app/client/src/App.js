import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <Fragment>
        <UserProvider>
          <Router>
          <Header />
          <Dashboard />
        </Router>
        </UserProvider>
    </Fragment>
  );
}

export default App;
