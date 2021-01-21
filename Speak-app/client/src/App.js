import React, { Fragment } from 'react';
import ApplicationsViews from './components/ApplicationViews';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <Fragment>
        <UserProvider>
          <ApplicationsViews />
        </UserProvider>
    </Fragment>
  );
}

export default App;
