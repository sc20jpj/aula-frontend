import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, sendSignOut,
} from '@store/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import { checkUser, user } from '@store/user/UserSlice';
import ProfilePage from '@components/ProfilePage/ProfilePage';

function Profile() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()
    const current_user = useSelector(user);
    const [badges, setBadges] = useState<Badge[]>()


    useEffect(() => {
        console.log("teacher : ", state.teacher)
        dispatch(checkUser()).then((res) => {
            if (state.teacher) {
                navigate(RoutesChoice.TeacherPortal)
            }
        })


    }, [])


    const getBadagesforUser = () => {


        API.getBadgesforCurrentUser()
            .then((res) => {
                setBadges(res.badges)
            })
            .catch((res) => {

            })

    }


    const signOut = () => {

        dispatch(sendSignOut())
            .unwrap()
            .then((res) => {
                navigate("")
            })

    }
    useEffect(() => {
        getBadagesforUser()
    }, []);

    return (
        <>
            {badges && current_user && (
                <>
                    <ProfilePage badges={badges} user={current_user} />
                </>
            )}

            <Button onClick={() => signOut()} title='Sign Out' />


        </>
    )
}

export default Profile