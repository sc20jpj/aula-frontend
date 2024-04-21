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
import { checkUser, user } from '@store/user/UserSlice';
import styles from "@components/LoggedInWrapper/LoggedInWrapper.module.scss"
import { useLocation, useNavigate } from 'react-router-dom';


interface LoggedInWrapperProps {
    children: React.ReactNode
    studentOnly: boolean
}
function LoggedInWrapper(props: LoggedInWrapperProps) {




    const location = useLocation();
    const dispatch = useAppDispatch();
    const state = useSelector(auth);
    const userState = useSelector(user);

    const navigate = useNavigate();
    const { children, studentOnly } = props;

    useEffect(() => {
        dispatch(getCurrentSession())
            .unwrap()
            .then((response) => {
                const res = dispatch(checkUser());
                return res;
            })
            .catch((error) => {
                console.log(error);
            });
    }, [location.pathname]); // Add location.pathname as a dependency

    // might want to change this but allows it so the ID never gets old
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getCurrentSession())
                .unwrap()
                .then((response) => {
                    const res = dispatch(checkUser());
                    return res;
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 300000);
    
        return () => {
            clearInterval(intervalId);
        };
    
    }, []);
    



    var navBarLinks: AppLinks[] = []
    if (state.teacher) {
        navBarLinks = [
            {
                url: RoutesChoice.TeacherPortal,
                label: "Home"
            },
            {
                url: RoutesChoice.ViewClasses,
                label: "View classes"
            },
            {
                url: RoutesChoice.AddModule,
                label: "Add module"
            },
            {
                url: RoutesChoice.AddBadge,
                label: "Add badge"
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
        <div className={styles.page}>






            {!state.loggedIn ? (
                <Unauthorised />
            ) : state.isSignUpSent && !state.isSignUpComplete ? (
                <VerficationCode />
            ) : (
                state.loggedIn && state.isSignUpSent && state.isSignUpComplete && (
                    <>


                        <div className={styles.container}>

                            {state.teacher ? (
                                <NavBar links={navBarLinks} />

                            ) : (
                                <NavBar links={navBarLinks} profile_name={
                                    userState?.name
                                } />

                            )}
                            <div className={styles.main}>
                                {children}
                            </div>

                        </div>



                    </>
                )

            )}


        </div>
    )
}

export default LoggedInWrapper;
