import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@views/SignIn/SignIn.module.scss'
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
        if (state.loggedIn == true && state.teacher == false) {
            navigate(RoutesChoice.StudentPortal)
        }
        else if (state.loggedIn == true && state.teacher == true) {
            navigate(RoutesChoice.TeacherPortal)
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
            dispatch(sendSignIn(userData))
                .unwrap()

                .then((res) => {
                    dispatch(clearAuth())
                    console.log(res)
                    if (state.teacher) {
                        navigate(RoutesChoice.TeacherPortal)
                    }
                    else{
                        navigate(RoutesChoice.StudentPortal)
                    }
                  
                })
                .catch((error) => {
                    console.log(error)
                    console.log("error reached")
                    setError("email and password incorrect")
                });
        }
    }


    return (
        <div className={styles.authContainer}>
            <div className={styles.auth}>
                <h1>Sign In</h1>

                <div>
                    <TextInput title="email" isPassword={false} value={state.email} onChange={(value) => dispatch(setEmail(value))} />
                    <TextInput title="password" isPassword={true} value={state.password} onChange={(value) => dispatch(setPassword(value))} />
                </div>

                <div className={styles.buttonContainer}>

                    <Button title="submit" onClick={() => handleSignInClick()}></Button>
                </div>

                <Link to={RoutesChoice.SignUp}>Sign Up</Link>
                <p>{error}</p>

            </div>
        </div>
    )
};


export default SignIn
