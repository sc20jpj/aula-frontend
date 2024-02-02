import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@components/SignIn/SignIn.module.scss'
import { SignInInput, SignInOutput, } from 'aws-amplify/auth';

import {
    setUsername,
    setPassword,
    sendSignIn,
    auth,
    clearAuth
} from '@store/auth/authSlice'
import { useAppDispatch } from '@store/hooks';

function SignIn() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);

    const handleSignInClick = async () => {
        // Replace with actual user input or data needed for sign-up
        const userData: SignInInput = {
            username: state.username,
            password: state.password,

        };

        dispatch(sendSignIn(userData))
            .then((res) => {
                console.log("Success:", res);
                dispatch(clearAuth())
            })
            .catch((error) => {
            });
    };

    return (
        <>
            <>
                <TextInput title="email" isPassword={false} value={state.username} onChange={(value) => dispatch(setUsername(value))} />
                <TextInput title="password" isPassword={true} value={state.password} onChange={(value) => dispatch(setPassword(value))} />
            </>
            <button onClick={() => handleSignInClick()}>submit</button>
        </>
    )
}

export default SignIn
