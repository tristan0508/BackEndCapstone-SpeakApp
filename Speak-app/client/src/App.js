import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationsViews from './components/ApplicationViews';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <Fragment>
        <UserProvider>
          <Router>
          <ApplicationsViews />
        </Router>
        </UserProvider>
    </Fragment>
  );
}

export default App;
