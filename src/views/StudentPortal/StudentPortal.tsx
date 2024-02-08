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



    useEffect(() => {
        dispatch(getCurrentSession())
        .unwrap()
        .then((response) => {
            return API.getTest()
        })
        .catch((error) => {
            console.log(error)
        })



        if (!state.cognito_username) {
            dispatch(getUserAttributes())
            .unwrap()
            .then((response) => {
                console.log(response)
                const result = dispatch(getCurrentSession())
                return result
            })
            .then((res) => {
                const apiResult = API.getTest()
                return apiResult
            })
            .then((res) => {
                const apiResult = console.log("api result is ")
                return apiResult
            })
            .catch((error) => {
                console.log(error)
            })
        }


    }, []);


    const signOut = () => {

        
        dispatch(sendSignOut())
        navigate(RoutesChoice.SignIn)
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
