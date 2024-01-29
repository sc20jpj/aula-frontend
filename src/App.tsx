// App.tsx

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; // Assuming you have a Redux store with persistor configured
import styles from './App.module.scss';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.appContainer}>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
