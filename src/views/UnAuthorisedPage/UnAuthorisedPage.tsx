import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import { useEffect } from 'react';

function Unauthorised() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);

    
    return (
        <>
            <>
                <p>You don't have persmissions to view this page</p>
                <Link to={RoutesChoice.SignIn}>Sign In</Link>
            </>

        </>
    )
}

export default Unauthorised
