import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getCurrentSession, getUserAttributes, sendSignOut,
} from '@store/auth/authSlice'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import styles from '@components/MultiSelect/MultiSelect.module.scss';
import Async, { useAsync } from 'react-select/async';
import { user } from '@store/user/UserSlice';

import Select, { ActionMeta, OnChangeValue } from 'react-select'


function AddStudent() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()

    const [options, setOptions] = useState<Option[]>([])
    const [usersOn, setUsersOn] = useState<UserResponse[]>([])
    const [selectedUserModules, setSelectedUserModules] = useState<UserModule[]>([]);
    const params = useParams();
    const [moduleId, setModuleId] = useState('');



    // Your component code...

    const addUsersToModule = (newValue: OnChangeValue<Option, true>, actionMeta: ActionMeta<Option>) => {
        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
            const removedUserId = actionMeta.removedValue?.value;
            if (removedUserId) {
                setSelectedUserModules(prevUsers => prevUsers.filter(user => user.user_id !== removedUserId));
            }
        } else if (actionMeta.action === "select-option") {
            newValue.forEach((option: Option) => {
                const newUserModule: UserModule = {
                    user_id: option.value,
                };
                setSelectedUserModules(prevUsers => [...prevUsers, newUserModule]);
            });

        }
        console.log(selectedUserModules);
    }





    const sendUserModules = async () => {
        if (!selectedUserModules) return;
        const newUserModuleRequest: UserModuleRequest = {
            users: selectedUserModules
        }
        API.postUserModules(moduleId, newUserModuleRequest)
            .then((res) => {

                // Assuming res contains the data to be appended to the users array
                setUsersOn(prevUsers => [...prevUsers, ...res]);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        console.log(params.moduleId);
        if (params.moduleId) {
            setModuleId(params.moduleId);
        }
    }, [params.moduleId]);

    useEffect(() => {
        if (moduleId) {
            getUsersOnModule();
        }
    }, [moduleId]);




    const getUsersOnModule = () => {
        console.log("moduleId is", moduleId)


        console.log("moduleID is", moduleId)
        API.getAllUsersOnModule(moduleId)
            .then((res) => {
                console.log("users on module")
                setUsersOn(res.users_on)

                const newOptions = res.users_not_on.map(user => ({
                    value: user.id,
                    label: user.name
                }));

                setOptions(options => [...options, ...newOptions]);

            })
            .catch((error) => {
                console.log("error has occured")
            })





    };







    return (
        <>


            {options && options.length > 0 ? (
                <>
                    <div>
                        <h2>Add To module</h2>
                        <Select
                            isClearable={true}
                            isMulti={true}
                            options={options}
                            onChange={addUsersToModule}

                        />
                        {selectedUserModules && selectedUserModules.length > 0 && (
                            <Button title='Add' onClick={() => sendUserModules()}></Button>

                        )}
                    </div>


                </>
            ) : (
                <p>All avaliable users have been added </p>
            )}

            {usersOn && usersOn.length > 0 ? (
                <table>
                    <thead>Students</thead>
                    <tbody>

                        <tr><td>Name</td></tr>
                        <tr><td>email</td></tr>
                        <tr><td>nickname</td></tr>

                        {usersOn.map((user, index) => (
                            <>
                                <tr>
                                    <td>{user.name}</td>
                                </tr>

                                <tr>
                                    <td>{user.email}</td>
                                </tr>

                                <tr>
                                    <td>{user.nickname}</td>
                                </tr>
                            </>

                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There are no users signed up to this class yet</p>
            )}

        </>
    )
}

export default AddStudent
