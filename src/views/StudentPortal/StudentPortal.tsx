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

function StudentPortal() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
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

            <>
                <p>Welcome {state.name}</p>
                <Link to={RoutesChoice.SignUp}>SignUp</Link>

                <Button onClick={() => signOut()} title='Sign Out' />
            </>

        </>
    )
}

export default StudentPortal
