import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth,
} from '@store/auth/authSlice'
import { Link, Route } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';

function StudentPortal() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);

    console.log("here")


    return (
        <>
            <>
                <p>Welcome student</p>
                <Link to={RoutesChoice.SignUp}>SignUp</Link>
            </>

        </>
    )
}

export default StudentPortal
