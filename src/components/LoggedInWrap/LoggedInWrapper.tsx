import React from "react"
import "@store/auth/authSlice"
import { useAppDispatch } from "@store/hooks";
import { useSelector } from "react-redux";
import { auth } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import RoutesChoice from "@enums/Routes";


interface LoggedInWrapperProps {
    children: React.ReactNode
}

function LoggedInWrapper(props: LoggedInWrapperProps) {
    const dispatch = useAppDispatch();
    const state = useSelector(auth);
    const navigate = useNavigate()
    const { children } = props;


    const unauthorised = () => {
        navigate(RoutesChoice.AppBase);
      };
      

    return (
        <>
        {state.loggedIn ? (
            children
        ) : (
            <>{unauthorised()}</>
        )}
    </>
    )

}

export default LoggedInWrapper