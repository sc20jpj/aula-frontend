// App.tsx

import React, { useEffect } from 'react';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import SignUp from '@views/SignUp/SignUp';
import SignIn from '@views/SignIn/SignIn';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import RoutesChoice from '@enums/Routes';
import LoggedInWrapper from '@components/LoggedInWrapper/LoggedInWrapper';
import StudentPortal from '@views/StudentPortal/StudentPortal';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import IncompleteSignUp from '@views/IncompleteSignUp/IncompleteSignUp';

function App() {
  const state = useAppSelector(auth);
  const dispatch = useAppDispatch();



  return (
    <Router>
      <Routes>
        <Route path={RoutesChoice.SignUp} element={<SignUp />} />
        <Route path={RoutesChoice.SignIn} element={<SignIn />} />
        <Route path={RoutesChoice.Unauthorised} element={<Unauthorised />} />
        <Route path={RoutesChoice.Incomplete} element={<IncompleteSignUp />} />

        <Route path={RoutesChoice.AppBase} element={
         <LoggedInWrapper><StudentPortal /></LoggedInWrapper> 

        }>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;

