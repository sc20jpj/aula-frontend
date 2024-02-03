import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@components/SignUp/SignUp.module.scss'
import { SignUpInput, SignInOutput, } from 'aws-amplify/auth';
import RoutesChoice from '@enums/Routes'

import {
  setUsername,
  setNickname,
  setPassword,
  sendSignUp,
  auth,
  clearAuth

} from '@store/auth/authSlice'
import { useAppDispatch } from '@store/hooks';
import { Link } from 'react-router-dom';

function SignUp() {

  const dispatch = useAppDispatch()
  const state = useSelector(auth);

  const handleSignUpClick = async () => {
    // Replace with actual user input or data needed for sign-up
    const userData: SignUpInput = {
      username: state.username,
      password: state.password,

      options: {
        userAttributes: {
          name: state.username,
          nickname: state.nickname,
        }
      }

    };

    dispatch(sendSignUp(userData))
      .then((res) => {
        console.log("Success:", res);
        dispatch(clearAuth())

      })
      .catch((error) => {
        // Handle error here
        console.error("Error:", error);
        // You can dispatch another action or perform further error handling
      });
  };

  return (
    <>
      <>

        <TextInput title="email" isPassword={false} value={state.username} onChange={(value) => dispatch(setUsername(value))} />
        
        <p>This is how you will appear to other users</p>
      
        <TextInput title="nickname" value={state.nickname} isPassword={false} onChange={(value) => dispatch(setNickname(value))} />
        <p>This is how you will appear to teachers</p>
        <TextInput title="name" isPassword={false} value={state.name}  onChange={(value) => dispatch(setNickname(value))}/>

        <TextInput title="password" value={state.password} isPassword={true} onChange={(value) => dispatch(setPassword(value))} />

        <Link to={RoutesChoice.SignIn}>Sign In</Link>

      </>
      <button onClick={() => handleSignUpClick()}>submit</button>
      <p>{state.error}</p>
    </>
  )
}

export default SignUp
