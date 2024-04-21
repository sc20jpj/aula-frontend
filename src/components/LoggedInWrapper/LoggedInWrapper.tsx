import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getCurrentSession
} from '@store/auth/authSlice'
import RoutesChoice from '@enums/Routes';
import React, { useEffect } from 'react';
import Unauthorised from '@views/UnAuthorisedPage/UnAuthorisedPage';
import VerficationCode from '@views/VerificationCode/VerificationCode';
import NavBar from '@components/NavBar/NavBar';
import { checkUser } from '@store/user/UserSlice';
import styles from "@components/LoggedInWrapper/LoggedInWrapper.module.scss"
import { useNavigate } from 'react-router-dom';


interface LoggedInWrapperProps {
    children: React.ReactNode
    studentOnly: boolean
}
function LoggedInWrapper(props: LoggedInWrapperProps) {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()
    const { children, studentOnly } = props;


    useEffect(() => {
        dispatch(getCurrentSession())
            .unwrap()
            .then((response) => {
                const res = dispatch(checkUser())

                return res
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    var navBarLinks: AppLinks[] = []
    if (state.teacher) {
        navBarLinks = [
            {
                url: RoutesChoice.TeacherPortal,
                label: "Home"
            },
            {
                url: RoutesChoice.ViewClasses,
                label: "View Classes" // Corrected label
            },
            {
                url: RoutesChoice.AddModule,
                label: "Add module" // Corrected label
            },
        ]
    }
    else {
        navBarLinks = [
            {
                url: RoutesChoice.StudentPortal,
                label: "Home"
            },
            {
                url: RoutesChoice.ViewClasses,
                label: "View Classes" // Corrected label
            }
        ]

    }





    return (
        <>

            <NavBar links={navBarLinks} />




            {!state.loggedIn ? (
                <Unauthorised />
            ) : state.isSignUpSent && !state.isSignUpComplete ? (
                <VerficationCode />
            ) : (
                state.loggedIn && state.isSignUpSent && state.isSignUpComplete && (
                    <>

                        <div className={styles.container}>

                            <div className={styles.main}>
                                {children}
                            </div>

                        </div>



                    </>
                )

            )}


        </>
    )
}

export default LoggedInWrapper;
