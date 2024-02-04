import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@components/SignIn/SignIn.module.scss'
import { SignInInput, SignInOutput, } from 'aws-amplify/auth';
import RoutesChoice from '@enums/Routes'
import { Link, useNavigate } from 'react-router-dom';

import {
    setEmail,
    setPassword,
    sendSignIn,
    auth,
    clearAuth,
    getCurrentSession
} from '@store/auth/authSlice'

import { useAppDispatch } from '@store/hooks';
import { useEffect } from 'react';

function SignIn() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (state.loggedIn == true) {
            navigate(RoutesChoice.AppBase)
        }
        else {
            dispatch(clearAuth())
        }

    }, []);

    const handleSignInClick = async () => {
        // Replace with actual user input or data needed for sign-up
        if (state.email && state.password) {
            const userData: SignInInput = {
                username: state.email,
                password: state.password,

            };

            dispatch(sendSignIn(userData))
                .then((res) => {
                    dispatch(clearAuth())
                    navigate(RoutesChoice.AppBase)

                })
                .catch((error) => {
                });
        }


    };

    return (
        <>
            <>
                <TextInput title="email" isPassword={false} value={state.email} onChange={(value) => dispatch(setEmail(value))} />
                <TextInput title="password" isPassword={true} value={state.password} onChange={(value) => dispatch(setPassword(value))} />
            </>
            <button onClick={() => handleSignInClick()}>submit</button>
            <Link to={RoutesChoice.SignUp}>Sign Up</Link>

        </>
    )
}

export default SignIn
