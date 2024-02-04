import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import React, { useEffect } from 'react';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import IncompleteSignUp from '@views/IncompleteSignUp/IncompleteSignUp';



interface LoggedInWrapperProps {
    children: React.ReactNode
}
function LoggedInWrapper(props: LoggedInWrapperProps) {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const { children } = props;


    // const navigate = useNavigate()
    // const checkAuthStatus = async () => {
    //     if (state.loggedIn === false && state.isSignUpComplete === true) {
    //         navigate(RoutesChoice.Unauthorised)
    //     }
    //     if (state.loggedIn === false && state.isSignUpComplete === false) {
    //         console.log("ran")
    //         navigate(RoutesChoice.Incomplete)
    //     }
    // }

    // useEffect(() => {
    //     checkAuthStatus()

    // }, []);

    return (
        <>
            { state.loggedIn == false && state.isSignUpComplete === true ? (
                <Unauthorised/>
            ): state.loggedIn === false && state.isSignUpComplete === false ? (
                <IncompleteSignUp/>
            ): (
                children
            


            )}
          
        </>
    )
}

export default LoggedInWrapper;
