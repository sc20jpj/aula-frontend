import styles from '@views/ViewClasses/ViewClasses.module.scss'
import ModuleBox from '@components/ModuleBox/ModuleBox';
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import Button from '@components/Button/Button';
import { useAppDispatch } from '@store/hooks';
import { user } from '@store/user/UserSlice';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import { auth } from '@store/auth/authSlice';


function ViewClasses() {
    const [modules, setModules] = useState<Module[]>();
    const state = useSelector(auth);

    const navigate = useNavigate()
    const current_user = useSelector(user)


    useEffect(() => {
        getModules();
    }, []);

    const getModules = async () => {

        if (current_user?.id) {
            API.getAllUserModules(current_user?.id)
                .then((res) => {
                    if (res.length !== 0) {
                        setModules(res);

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };


    const deleteModule = (moduleId: string) => {
        API.deleteModule(moduleId)
            .then((res) => {
                if (modules) {
                    setModules(modules.filter((module) => module.id !== moduleId));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleRedirect = (moduleId?: string) => {
        if (moduleId) {

            const path = generatePath(RoutesChoice.ViewFullClass, { moduleId });
            navigate(path);

        }

    };
    return (
        <>
            <h1>Modules</h1>
            <div className={styles.moduleContainer} >


                {modules ? (
                    modules.map((module, index) => (

                        <div key={index} className={styles.moduleWrapper}>

                            <ModuleBox module={module} onClick={() => handleRedirect(module.id)} />

                        </div>
                    ))
                ) : (
                    <p>You haven't added any classes yet</p>
                )}
            </div>
        </>


    );
}

export default ViewClasses;