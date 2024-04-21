import ModuleBox from '@components/ModuleBox/ModuleBox';
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import Button from '@components/Button/Button';
import { useAppDispatch } from '@store/hooks';
import { user } from '@store/user/UserSlice';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath, useParams } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import { auth } from '@store/auth/authSlice';
import styles from '@components/UserTable/UserTable.module.scss'; // Import your component's SCSS file
import PointsBox from '@components/PointsBox/PointsBox';
import PointsBoxGroup from '@components/PointsBoxGroup/PointsBoxGroup';
import UserTable from '@components/UserTable/UserTable';


function ViewLeaderboard() {
    const [users, setUsers] = useState<User[]>();
    const state = useSelector(auth);
    const params = useParams()

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
            API.getAllUsers()
                .then((res) => {
                    setUsers(res.users)
                })
                .catch((error) => {
                    console.log(error);
                });
        

    };

    return (
        <>

            <h1>Aula leaderboard</h1>
            <p>here is the current leaderboard for the aula project across all classes</p>

            {users && (
                <UserTable users={users} ordered={true} />

            )}



        </>


    );
}

export default ViewLeaderboard;