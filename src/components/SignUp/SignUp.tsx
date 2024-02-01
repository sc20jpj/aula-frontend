import TextInput from '../Inputs/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@components/SignUp/SignUp.module.scss'
import { SignUpInput, SignInOutput,  } from 'aws-amplify/auth';

import {
  setUsername,
  setNickname,
  setPassword,
  sendSignUp,
  auth
  
} from '@store/auth/authSlice'
import { useAppDispatch } from '@store/hooks';

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
        // Handle success here
        console.log("Success:", res);
        // You can dispatch another action or perform further operations
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
      <TextInput title="email" isPassword={false} onChange={(value) => dispatch(setUsername(value))} />
      <p>This is how you will appear to other users</p>
      <TextInput title="nickname" isPassword={false} onChange={(value) => dispatch(setNickname(value))} />
      <p>This is how you will appear to teachers</p>

      <TextInput title="name" isPassword={false} onChange={(value) => dispatch(setNickname(value))} />

      <TextInput title="password" isPassword={true} onChange={(value) => dispatch(setPassword(value))} />

      </>
      <button onClick={() => handleSignUpClick()}>submit</button>
      <p>{state.error}</p>
    </>
  )
}

export default SignUp
