// App.tsx

import React from 'react';
import { auth } from '@store/auth/authSlice';
import SignUp from '@components/SignUp/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';

function App() {

  const state = useAppSelector(auth)
  return (

    <Router>
      <Routes>

        <Route path={"/"}  element={<SignUp/>}>
        </Route>



      </Routes>

    </Router>

  );
}

export default App;
