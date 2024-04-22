import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, checkVerificatonCode, clearAuth, resendVerificationCode, sendAutoSignIn, sendSignOut, setCode, setEmail
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import { useEffect, useState } from 'react';
import NumberInput from '@components/Inputs/NumberInput/NumberInput';
import Button from '@components/Button/Button';
import { ConfirmSignInInput, ConfirmSignUpInput, ResendSignUpCodeInput } from 'aws-amplify/auth';
import TextInput from '@components/Inputs/TextInput/TextInput';
import { API } from '@lib/APi';
import NavBar from '@components/NavBar/NavBar';
import styles from "@views/SignIn/SignIn.module.scss"
function VerficationCode() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const [error, setError] = useState<String>("");
    const navigate = useNavigate()
    const handleResend = async () => {
        console.log(state.checkEmail)
        if (state.checkEmail) {
            const resendInput: ResendSignUpCodeInput = {
                username: state.checkEmail
            }
            console.log("s")
            dispatch(resendVerificationCode(resendInput))
                .unwrap()
                .then((res) => {
                    console.log(res)
                })

        }

    }
    const handleCheckClick = async () => {


        if (!state.code) {
            setError("Please enter a code")
        }
        else {
            console.log("userId is ", state.cognito_username)
            console.log("name is ", state.name)

            if (state.email && state.name && state.nickname && state.cognito_username) {
                const confirmData: ConfirmSignUpInput = {
                    username: state.email,
                    confirmationCode: state.code
                }
                // this should only be used in local environments to sim a lambda trigger
                const newUser: User = {
                    email: state.email,
                    name: state.name,
                    nickname: state.nickname,
                    cognito_username: state.cognito_username
                }
                dispatch(checkVerificatonCode(confirmData))
                    .unwrap()
                    .then((res) => {
                        const signOutresult = dispatch(sendSignOut())
                        return signOutresult
                    })
                    .then((res) => {
                        const signInResult = dispatch(sendAutoSignIn())
                        return signInResult
                    })
                    .then((res) => {
                        console.log(res)
                        const apiResult = API.postNewUser(newUser)
                        return apiResult
                    })
                    .then((res) => {
                        dispatch(clearAuth())
                        navigate(RoutesChoice.StudentPortal)
                    })
                    .catch((error) => {
                        console.log(error)
                        setError("Code is incorrect please re-enter")
                    });
            }
        }


    }


    return (
        <>
            <NavBar></NavBar>
            <div className={styles.authContainer}>
                <div className={styles.auth}>

                    <p>We have sent a verification code to {state.checkEmail}</p>
                    <p>Please enter the code below to confirmed your sign up {state.checkEmail}</p>

                    <NumberInput title='Code' onChange={(value) => dispatch(setCode(value))}></NumberInput>
                    <div className={styles.buttonContainer}>
                        <Button title="submit" onClick={() => handleCheckClick()}></Button>

                        <Button title="Resend code" onClick={() => handleResend()}></Button>
                        <Button title="Sign Up" onClick={() => navigate(RoutesChoice.SignUp)}></Button>

                    </div>

                    <p>{error}</p>

                </div>
            </div>
        </>
    )
}

export default VerficationCode
