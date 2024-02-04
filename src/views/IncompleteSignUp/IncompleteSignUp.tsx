import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { Link } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';

function IncompleteSignUp() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);


    console.log("incomplete reached")

    return (
        <>
            <>
                <p>Please complete your sign up. Their should be a link in your email address to complete sign up </p>
                <p>Click the link and finish signing up  </p>
                <Link to={RoutesChoice.SignIn}>Sign In</Link>
            </>

        </>
    )
}

export default IncompleteSignUp
