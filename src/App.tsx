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
import VerficationCode from '@views/VerificationCode/VerificationCode';
import ViewClasses from '@views/ViewClasses/ViewClasses';
import TeacherWrapper from '@components/TeacherWrapper/TeacherWrapper';
import TeacherPortal from '@views/TeacherPortal/TeacherPortal';
import NavBar from '@components/NavBar/NavBar';
import AddModule from '@views/AddModule/AddModule';
import ViewFullClass from '@views/ViewFullClass/ViewFullClass';

function App() {
  const state = useAppSelector(auth);
  const dispatch = useAppDispatch();




  return (
    <Router>
      <Routes>
        <Route path={RoutesChoice.SignUp} element={<SignUp />} />
        <Route path={RoutesChoice.SignIn} element={<SignIn />} />
        <Route path={RoutesChoice.Unauthorised} element={<Unauthorised />} />
        <Route path={RoutesChoice.Incomplete} element={<VerficationCode />} />


    
        <Route path={RoutesChoice.TeacherPortal} element={
          <TeacherWrapper><TeacherPortal /></TeacherWrapper>

        } />

        <Route path={RoutesChoice.StudentPortal} element={
          <LoggedInWrapper studentOnly={true}><StudentPortal /></LoggedInWrapper>

        } />


        <Route path={RoutesChoice.ViewClasses} element={
          <LoggedInWrapper studentOnly={false}>  <ViewClasses /></LoggedInWrapper>

        } />

        <Route path={RoutesChoice.AddToModule} element={
          <TeacherWrapper>  <ViewFullClass /></TeacherWrapper>

        } />


        <Route path={RoutesChoice.AddModule} element={
          <TeacherWrapper><AddModule /></TeacherWrapper>

        } />



      </Routes>
    </Router>
  );
}

export default App;

