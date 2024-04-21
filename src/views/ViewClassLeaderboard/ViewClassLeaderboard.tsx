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
import UserModuleTable from '@components/UserTable/UserModuleTable';


function ViewClassLeaderboard() {
    const [users, setUsers] = useState<UserModuleResponse[]>();
    const [name, setName] = useState<string>("");

    const state = useSelector(auth);
    const params = useParams()

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        if (params.moduleId) {
            API.getAllUserModulesonModule(params.moduleId)
                .then((res) => {
                    console.log(res)
                    setUsers(res.users)
                    setName(res.name)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        

    };

    return (
        <>

            <h1>{name} leaderboard</h1>

            {users && (
                <UserModuleTable users={users}  />

            )}

        </>


    );
}

export default ViewClassLeaderboard;