import React, { Fragment } from 'react';
import ApplicationsViews from './components/ApplicationViews';
import { ChatProvider } from './providers/ChatProvider';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <Fragment>
        <UserProvider>
          <ChatProvider>
            <ApplicationsViews />
          </ChatProvider>
        </UserProvider>
    </Fragment>
  );
}

export default App;
