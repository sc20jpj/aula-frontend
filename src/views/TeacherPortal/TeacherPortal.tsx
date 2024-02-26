import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getCurrentSession, getUserAttributes, sendSignOut,
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect } from 'react';
import { API } from '@lib/APi';
import NavBar from '@components/NavBar/NavBar';
import { user,checkUser } from '@store/user/UserSlice';

function TeacherPortal() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const current_user = useSelector(user);

    const navigate = useNavigate()
    

    const signOut = () => {


        dispatch(sendSignOut())
            .unwrap()
            .then((res) => {
                navigate(RoutesChoice.SignIn)
            })

    }

      
      return (
        <>

          <div>
            <p>Welcome {current_user?.name}</p>
            <Link to={RoutesChoice.SignUp}>Sign Up</Link>
            <Button onClick={signOut} title='Sign Out' />
          </div>

        </>
      )
}

      

export default TeacherPortal
