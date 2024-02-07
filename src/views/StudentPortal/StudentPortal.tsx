import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getUserAttributes, sendSignOut,
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect } from 'react';

function StudentPortal() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()



    useEffect(() => {


        if (state.name === "" || state.nickname === "" || state.email === "") {
            dispatch(getUserAttributes())
            .unwrap()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
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
