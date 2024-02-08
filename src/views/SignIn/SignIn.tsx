import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@components/SignIn/SignIn.module.scss'
import { SignInInput, SignInOutput, signOut, } from 'aws-amplify/auth';
import RoutesChoice from '@enums/Routes'
import { Link, useNavigate } from 'react-router-dom';

import {
    setEmail,
    setPassword,
    sendSignIn,
    auth,
    clearAuth,
    getCurrentSession,
    sendSignOut
} from '@store/auth/authSlice'

import { useAppDispatch } from '@store/hooks';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';

function SignIn() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()
    const [error, setError] = useState<String>("");

    useEffect(() => {
        if (state.loggedIn == true) {
            navigate(RoutesChoice.AppBase)
        }
        else {
            dispatch(clearAuth())
        }

    }, []);

    const handleSignInClick = async () => {

        if (!state.email) {
            setError("Please enter an email ")
        }
        else if (!state.password) {
            setError("Please enter a password")
        }
        else {
            const userData: SignInInput = {
                username: state.email,
                password: state.password,
            };
            dispatch(sendSignOut())
            .unwrap()
            .then((res) => {
                const result  = dispatch(sendSignIn(userData))
                return result
            })
            .then((res) => {
                dispatch(clearAuth())
                console.log(res)
                navigate(RoutesChoice.AppBase)
            })            
            .catch((error) => {
                console.log(error)
                console.log("error reached")
                setError("email and password incorrect")
            });
        }
    }


    return (
        <>
            <>
                <TextInput title="email" isPassword={false} value={state.email} onChange={(value) => dispatch(setEmail(value))} />
                <TextInput title="password" isPassword={true} value={state.password} onChange={(value) => dispatch(setPassword(value))} />
            </>
            <Button title="submit" onClick={() => handleSignInClick()}></Button>
            <Link to={RoutesChoice.SignUp}>Sign Up</Link>
            <p>{error}</p>

        </>
    )
};


export default SignIn
