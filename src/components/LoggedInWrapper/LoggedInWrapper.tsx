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



interface LoggedInWrapperProps {
    children: React.ReactNode
}
function LoggedInWrapper(props: LoggedInWrapperProps) {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const { children } = props;


    return (
        <>
            { state.loggedIn == false && state.isSignUpComplete === true ? (
                <Unauthorised/>
            ): state.loggedIn === false && state.isSignUpSent === true && state.isSignUpComplete  === false?  (
                <VerficationCode/>
            ): (
                children
        

            )}
          
        </>
    )
}

export default LoggedInWrapper;
