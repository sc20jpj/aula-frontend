import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useSelector } from 'react-redux';
import styles from '@views/SignUp/SignUp.module.scss'
import { SignUpInput, SignInOutput, } from 'aws-amplify/auth';
import RoutesChoice from '@enums/Routes'

import {
  setEmail,
  setNickname,
  setPassword,
  sendSignUp,
  auth,
  clearAuth,
  setName,
  sendAutoSignIn

} from '@store/auth/authSlice'
import { useAppDispatch } from '@store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import Button from '@components/Button/Button';
import NavBar from '@components/NavBar/NavBar';

function SignUp() {

  const dispatch = useAppDispatch()
  const state = useSelector(auth);
  const navigate = useNavigate()
  const [error, setError] = useState<String>("");

  useEffect(() => {

    dispatch(clearAuth())


  }, []);

  const isPasswordValid = (password: string) => {


    const passwordRegex = /^(?=.*[!@#$%^&*()-_+=<>?]).*(?=.*\d).{8,}$/;

    return passwordRegex.test(password);
  }
  const isEmailValid = (password: string) => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(password);
  }

  const handleSignUpClick = async () => {

    // Replace with actual user input or data needed for sign-up

    if (!state.nickname) {
      setError("Please enter a nickname")
    }
    else if (!state.name) {
      setError("Please enter a name")
    }
    else if (!state.password) {
      setError("Please enter a password")
    }
    else if (!state.email) {
      setError("Please enter an email ")
    }
    else {

      if (isEmailValid(state.email) == false) {
        setError("Please enter a valid email")
      }
      else if (isPasswordValid(state.password) == false) {
        setError("Please enter a valid password, Passwords must contain 8 characters a symbol and a number")
      }

      else {
        const userData: SignUpInput = {
          username: state.email,
          password: state.password,
          options: {
            userAttributes: {
              name: state.email,
              nickname: state.nickname,
            },

            autoSignIn: true

          }
        }
        console.log(userData)

        dispatch(sendSignUp(userData))
          .unwrap()
          .then((res) => {
            console.log(res)
            setError("")
            navigate(RoutesChoice.Incomplete)
          })
          .catch((error) => {
            console.log(error)
            setError("There was an error signing up from our service. Please re-enter and try again.")
          });

      }
    }


  };

  return (
    <>
      <NavBar></NavBar>

      <div className={styles.authContainer}>
        <div className={styles.auth}>
          <h1>Sign Up</h1>
          <>
            <TextInput title="email" isPassword={false} value={state.email} onChange={(value) => dispatch(setEmail(value))} />

            <p>This is how you will appear to other users</p>

            <TextInput title="nickname" value={state.nickname} isPassword={false} onChange={(value) => dispatch(setNickname(value))} />
            <p>This is how you will appear to teachers</p>
            <TextInput title="name" isPassword={false} value={state.name} onChange={(value) => dispatch(setName(value))} />

            <TextInput title="password" value={state.password} isPassword={true} onChange={(value) => dispatch(setPassword(value))} />

          </>
          <div className={styles.buttonContainer}>
            <Button title="submit" onClick={() => handleSignUpClick()}></Button>
          </div>
          <p className={styles.error}>{error}</p>

          <Link to={RoutesChoice.SignIn}>Sign In</Link>
        </div>
      </div>



    </>
  )
}

export default SignUp
