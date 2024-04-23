// App.tsx

import React, { useEffect } from 'react';
import { auth, getCurrentSession } from '@store/auth/authSlice';
import SignUp from '@views/SignUp/SignUp';
import SignIn from '@views/SignIn/SignIn';
import { BrowserRouter as Router, Route, Routes, generatePath } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import RoutesChoice from '@enums/Routes';
import LoggedInWrapper from '@components/LoggedInWrapper/LoggedInWrapper';
import StudentPortal from '@views/StudentPortal/StudentPortal';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import VerficationCode from '@views/VerificationCode/VerificationCode';
import ViewClasses from '@views/ViewClasses/ViewClasses';
import TeacherWrapper from '@components/TeacherWrapper/TeacherWrapper';
import TeacherPortal from '@views/TeacherPortal/TeacherPortal';
import AddModule from '@views/AddModule/AddModule';
import ViewFullClass from '@views/ViewFullClass/ViewFullClass';
import AddLesson from '@views/AddLesson/AddLesson';
import AddQuiz from '@views/AddQuiz/AddQuiz';
import TakeQuiz from '@views/TakeQuiz/TakeQuiz';
import ViewClassResults from '@views/ViewClassResults/ViewClassResults';
import AddBadge from '@views/AddBadge/AddBadge';
import Profile from '@views/Profile/Profile';
import "./main.css"
import ViewLeaderboard from '@views/ViewLeaderboard/ViewLeaderboard';
import ViewClassLeaderboard from '@views/ViewClassLeaderboard/ViewClassLeaderboard';

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

          <Route path={RoutesChoice.ViewFullClass} element={
            <LoggedInWrapper studentOnly={false}>  <ViewFullClass /></LoggedInWrapper>

          } />


          <Route path={RoutesChoice.ViewLeaderboard} element={
            <LoggedInWrapper studentOnly={false}>  <ViewLeaderboard /></LoggedInWrapper>

          } />

          <Route path={RoutesChoice.ViewClassLeaderboard} element={
            <LoggedInWrapper studentOnly={false}>  <ViewClassLeaderboard /></LoggedInWrapper>

          } />

          <Route path={RoutesChoice.Profile}  element={
            <LoggedInWrapper studentOnly={true}>  <Profile /></LoggedInWrapper>

          } />


          <Route path={RoutesChoice.TakeQuiz} element={
            <LoggedInWrapper studentOnly={true}>  <TakeQuiz /></LoggedInWrapper>

          } />

          <Route path={RoutesChoice.AddModule} element={
            <TeacherWrapper><AddModule /></TeacherWrapper>

          } />
          <Route path={RoutesChoice.ViewClassResults} element={
            <TeacherWrapper><ViewClassResults /></TeacherWrapper>

          } />
          <Route path={RoutesChoice.AddQuiz} element={
            <TeacherWrapper><AddQuiz /></TeacherWrapper>

          } />

          <Route path={RoutesChoice.AddLesson} element={
            <TeacherWrapper><AddLesson /></TeacherWrapper>

          } />

          <Route path={RoutesChoice.AddBadge} element={
            <TeacherWrapper><AddBadge /></TeacherWrapper>

          } />



        </Routes>
      </Router>
  );
}

export default App;

