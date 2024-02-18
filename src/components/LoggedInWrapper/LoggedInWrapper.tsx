import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import React, { useEffect } from 'react';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import VerficationCode from '@views/VerificationCode/VerificationCode';
import NavBar from '@components/NavBar/NavBar';



interface LoggedInWrapperProps {
    children: React.ReactNode
}
function LoggedInWrapper(props: LoggedInWrapperProps) {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const { children } = props;
    const NavBarLinks: AppLinks[] = [
        {
          url: RoutesChoice.SignIn,
          label: "Add Module"
        },
        {
          url: RoutesChoice.SignUp,
          label: "View Classes" // Corrected label
        }
      ]
      console.log(state.teacher)

    return (
        <>
            {!state.loggedIn || state.teacher ? (
                <Unauthorised />
            ) : state.isSignUpSent && !state.isSignUpComplete ? (
                <VerficationCode />
            ) : (
                state.loggedIn && state.isSignUpSent && state.isSignUpComplete  && !state.teacher && (
                    <>
                    <NavBar links={NavBarLinks} />
                    {children}
                    </>
                )
 
            )}
          
        </>
    )
}

export default LoggedInWrapper;
