// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@store/store'; // Assuming you have a Redux store with persistor configured
import { isLoggedIn } from '@store/auth/authSlice';
import SignUp from '@components/SignUp/SignUp';
import { useAppSelector } from '@store/hooks';

function App() {

  const loggedIn = useAppSelector(isLoggedIn)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div >
          {loggedIn ? <p>hello</p> : <SignUp />}
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
