import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getCurrentSession
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import VerficationCode from '@views/VerificationCode/VerificationCode';
import NavBar from '@components/NavBar/NavBar';
import RoutesChoice from '@enums/Routes';
import { checkUser } from '@store/user/UserSlice';



interface TeacherWrapperProps {
    children: React.ReactNode
}
function TeacherWrapper(props: TeacherWrapperProps) {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const { children } = props;
    useEffect(() => {
        dispatch(getCurrentSession())
            .unwrap()
            .then((response) => {
                const res = dispatch(checkUser())
                return res
            })
            .catch((error) => {
                console.log(error)
            })
        }, [])
    const NavBarLinks: AppLinks[] = [
        {
          url: RoutesChoice.AddModule,
          label: "Add Module"
        },
        {
            url: RoutesChoice.ViewClasses,
            label: "View classes"
          },
          {
            url: RoutesChoice.TeacherPortal,
            label: "Home"
          },

      ]
    return (
        <>
            {!state.loggedIn || (state.loggedIn && !state.teacher) ? (
                <Unauthorised />
            ) : state.isSignUpSent && !state.isSignUpComplete ? (
                <VerficationCode />
            ) : (
                state.loggedIn && state.teacher && state.isSignUpSent && state.isSignUpComplete  && (
                    <>
                    <NavBar links={NavBarLinks} />
                    {children}
                    </>
                   
                )
 
            )}


        </>
    )
}

export default TeacherWrapper;
