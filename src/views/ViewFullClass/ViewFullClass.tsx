import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth
} from '@store/auth/authSlice'
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Button from '@components/Button/Button'
import { useEffect, useState } from 'react';
import { API } from '@lib/APi';


import Select, { ActionMeta, OnChangeValue } from 'react-select'
import RoutesChoice from '@enums/Routes';
import AccordionContainer from '@components/AccordionContainer/AccodionContainer';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserTable from '@components/UserTable/UserTable';


function ViewFullClass() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()

    const [options, setOptions] = useState<Option[]>([])
    const [usersOn, setUsersOn] = useState<UserResponse[]>([])
    const [module, setModule] = useState<ModuleRequest>()
    const [teacherName, setTeacherName] = useState<string>()

    const [selectedUserModules, setSelectedUserModules] = useState<UserModule[]>([]);
    const [lessons, setLessons] = useState<LessonWithFiles[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);


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


    const handleRedirect = () => {
        if (moduleId) {
            console.log("Ran")
            console.log(moduleId)
            const path = generatePath(RoutesChoice.AddLesson, { moduleId });
            navigate(path);

        }

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

    const getAllLessonsForModule = async () => {


        API.getAllLessonsForModule(moduleId)
            .then((res) => {


                setLessons(prevLessons => [...prevLessons, ...res.lessons]);

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
            getAllLessonsForModule();
        }
    }, [moduleId]);


    const getUsersOnModule = () => {
        console.log("moduleId is", moduleId)


        console.log("moduleID is", moduleId)
        API.getAllUsersOnModule(moduleId)
            .then((res) => {
                console.log("users on module")

                setModule(res.module)
                setTeacherName(res.teacher)
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

            {module && teacherName && (
                <>
                    <h1>{module.name}</h1>

                    <p>Taught by {teacherName}</p>

                    {state.teacher && (
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

                            {usersOn && state.teacher == true && usersOn.length > 0 ? (

                                <AccordionContainer title='Students on module'>
                                    <UserTable users={usersOn}></UserTable>
                                </AccordionContainer>



                            ) : (
                                <p>There are no users signed up to this class yet</p>
                            )}


                            <Button title='Add lesson' onClick={() => handleRedirect()} />
                        </>

                    )}

                    {loading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                        </>
                    ) : (

                        <>

                            {/* this could probably be a component */}
                            {lessons && lessons.length > 0 ? (
                                <AccordionContainer title="Lessons">
                                    {lessons.map((lesson, index) => (

                                        <AccordionContainer title={lesson.name}>

                                            <p>{lesson.description}</p>

                                            {lesson.files.map((document, docIndex) => (


                                                <AccordionContainer key={docIndex} title={document.name}>

                                                    {document.file_type != "application/pdf" ? (
                                                        <div>
                                                            <DocViewer
                                                                documents={[
                                                                    { uri: document.s3_url, fileType: document.file_type }
                                                                ]}
                                                                prefetchMethod="GET"
                                                                pluginRenderers={DocViewerRenderers}
                                                            />



                                                            <a href={document.s3_url}>Download</a>
                                                        </div>

                                                    ) : (
                                                        <>
                                                            <DocViewer
                                                                documents={[
                                                                    { uri: document.s3_url, fileType: document.file_type }
                                                                ]}
                                                                prefetchMethod="GET"
                                                                pluginRenderers={DocViewerRenderers}
                                                            />

                                                        </>

                                                    )}

                                                </AccordionContainer>
                                            ))}


                                        </AccordionContainer>

                                    ))}
                                </AccordionContainer>
                            ) : state.teacher ? (
                                <p>There are no lessons for this class yet</p>
                            ) : (
                                <></>
                            )}

                        </>

                    )}

                </>
            )}





        </>
    )
}
export default ViewFullClass;
