// App.tsx

import React from 'react';
import { auth } from '@store/auth/authSlice';
import SignUp from '@views/SignUp/SignUp';
import SignIn from '@views/SignIn/SignIn';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';

function App() {

  const state = useAppSelector(auth)
  return (

    <Router>
      <Routes>

        <Route path={"/"} element={<SignUp />} />
        <Route path={"/SignIn"} element={<SignIn />} />


      </Routes>

    </Router >

  );
}

export default App;
