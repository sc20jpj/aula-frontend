import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, sendSignOut,
} from '@store/auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import { checkUser, user } from '@store/user/UserSlice';
import ProfilePage from '@components/ProfilePage/ProfilePage';

function Profile() {

    const dispatch = useAppDispatch()
    const params = useParams()
    const state = useSelector(auth);
    const navigate = useNavigate()
    const current_user = useSelector(user);
    const [chosenUser, setUser] = useState<User | null>()

    const [badges, setBadges] = useState<Badge[]>()




    const getBadagesforUser = () => {
        console.log(params)
        if(params.userId ) {
            API.getBadgesforCurrentUser(params.userId)
            .then((res) => {
                setUser(res)
                setBadges(res.badges)
            })
            .catch((res) => {
    
            })
        }
        else{ 

        API.getBadgesforCurrentUser()
        .then((res) => {
            if (current_user) {
                
                setUser(current_user)
            }
            setBadges(res.badges)
        })
        .catch((res) => {

        })
        }


    }


    const signOut = () => {

        dispatch(sendSignOut())
            .unwrap()
            .then((res) => {
                navigate(RoutesChoice.SignIn)
            })

    }
    useEffect(() => {
        getBadagesforUser()
    }, []);

    return (
        <>
            {badges && current_user &&  (
                <>
                    <ProfilePage badges={badges} user={chosenUser!} />
                </>
            )}
            {params.user_id ? (
                <></>
            ) : (
                <Button onClick={() => signOut()} title='Sign Out' />

            )}


        </>
    )
}

export default Profile
