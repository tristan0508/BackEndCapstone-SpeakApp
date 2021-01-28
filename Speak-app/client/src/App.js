import React, { Fragment } from 'react';
import ApplicationsViews from './components/ApplicationViews';
import { ChatHubProvider } from './providers/ChatHubProvider';
import { UserProvider } from './providers/UserProvider';
import { ChatProvider } from './providers/ChatProvider';

function App() {
  return (
    <Fragment>
        <UserProvider>
          <ChatHubProvider>
            <ChatProvider>
              <ApplicationsViews />
            </ChatProvider>
          </ChatHubProvider>
        </UserProvider>
    </Fragment>
  );
}

export default App;
