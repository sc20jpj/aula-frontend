// App.tsx

import React, { useEffect } from 'react';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import SignUp from '@views/SignUp/SignUp';
import SignIn from '@views/SignIn/SignIn';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import RoutesChoice from '@enums/Routes';
import LoggedInWrapper from '@components/LoggedInWrap/LoggedInWrapper';
import StudentPortal from '@views/StudentPortal/StudentPortal';

function App() {
  const state = useAppSelector(auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(state.accessToken);

    if (state.accessToken == null || state.idToken == null) {
      dispatch(getCurrentSession());
      console.log(state.accessToken);
      console.log("ran");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={RoutesChoice.SignUp} element={<SignUp />} />
        <Route path={RoutesChoice.SignIn} element={<SignIn />} />


        <Route path={RoutesChoice.AppBase} element={

          <LoggedInWrapper ><StudentPortal /></LoggedInWrapper>

        }>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

