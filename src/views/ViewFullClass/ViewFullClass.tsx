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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserTable from '@components/UserTable/UserTable';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import PointsBox from '@components/PointsBox/PointsBox';
import styles from "@views/ViewFullClass/ViewFullClass.module.scss"
import PointsBoxGroup from '@components/PointsBoxGroup/PointsBoxGroup';

function ViewFullClass() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()

    const [options, setOptions] = useState<Option[]>([])
    const [usersOn, setUsersOn] = useState<User[]>([])
    const [module, setModule] = useState<ModuleResponse>()
    const [teacherName, setTeacherName] = useState<string>()

    const [selectedUserModules, setSelectedUserModules] = useState<UserIdList[]>([]);
    const [lessons, setLessons] = useState<LessonWithFiles[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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
                const newUserModule: UserIdList = {
                    user_id: option.value,
                };
                setSelectedUserModules(prevUsers => [...prevUsers, newUserModule]);
            });

        }
        console.log(selectedUserModules);
    }


    const handleRedirectLesson = () => {
        if (moduleId) {
            console.log("Ran")
            console.log(moduleId)
            const path = generatePath(RoutesChoice.AddLesson, { moduleId });
            navigate(path);

        }

    }

    const handleRedirectQuiz = () => {
        if (moduleId) {
            console.log("Ran")
            console.log(moduleId)
            const path = generatePath(RoutesChoice.AddQuiz, { moduleId });
            navigate(path);

        }

    }

    const handleRedirectLeaderBoard = () => {
        if (moduleId) {
            console.log("Ran")
            console.log(moduleId)
            const path = generatePath(RoutesChoice.ViewClassLeaderboard, { moduleId });
            navigate(path);

        }

    }


    const handleRedirectTakeQuiz = (quizId: string) => {
        if (moduleId) {
            const path = generatePath(RoutesChoice.TakeQuiz, { moduleId, quizId, });
            navigate(path);

        }

    }

    const handleResultsRedirect = (quizId: string) => {
        if (moduleId) {
            const path = generatePath(RoutesChoice.ViewClassResults, { quizId, });
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

                const module: ModuleResponse = {
                    name: res.name,
                    code: res.code,
                    points: res.points,
                    teacher: res.teacher
                }
                console.log(res.points)
                setModule(module)

                setLessons(res.lessons)

            })
            .catch((error) => {
                console.log(error);
            });
    }


    const getAlQuizzesForModule = async () => {


        API.getAllQuizzesforModule(moduleId)
            .then((res) => {

                setQuizzes(res.quizzes);
                console.log(quizzes)

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
            if (state.teacher) {
                getUsersOnModule();
            }
            getAllLessonsForModule();
            getAlQuizzesForModule();
        }
    }, [moduleId]);


    const getUsersOnModule = () => {

        API.getAllUsersOnModule(moduleId)
            .then((res) => {

                setModule(res.module)
                setTeacherName(res.teacher)
                setUsersOn(res.users_on)

                const newOptions = res.users_not_on.map(user => ({

                    value: user.id!,
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

            {module && (
                <>
                    <div className={styles.titleWrapper}>
                        <h1>{module.name}</h1>


                        {module.points && (

                            <div className={styles.xpBox}>
                                <p>XP</p>
                                <PointsBox points={module.points} />

                            </div>

                        )}
                        <hr className='rules'></hr>

                    </div>

                    <h3>{module.code}</h3>
                    <p>Taught by {module.teacher}</p>

                    <Button title='View leaderboard' onClick={() => handleRedirectLeaderBoard()} />

                    {state.teacher && (
                        <>
                            <Button title='Add lesson' onClick={() => handleRedirectLesson()} />

                            <Button title='Add Quiz' onClick={() => handleRedirectQuiz()} />
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
                                <AccordionContainer title="Training">
                                    {lessons.map((lesson, index) => (

                                        <AccordionContainer title={lesson.name}>

                                            <p>{lesson.description}</p>

                                            {lesson.files.map((document, docIndex) => (


                                                <AccordionContainer key={docIndex} title={document.name}>

                                                    {document.file_type != "application/pdf" ? (
                                                        <>
                                                            <DocViewer
                                                                documents={[
                                                                    { uri: document.s3_url, fileType: document.file_type }
                                                                ]}
                                                                prefetchMethod="GET"

                                                                pluginRenderers={DocViewerRenderers}
                                                            />

                                                            <a href={document.s3_url}>Download</a>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <DocViewer
                                                                documents={[
                                                                    { uri: document.s3_url, fileType: "pdf" }
                                                                ]}
                                                                prefetchMethod="GET"
                                                                pluginRenderers={DocViewerRenderers}
                                                            />
                                                            <p>Please use this download button instead</p>
                                                            <a href={document.s3_url}>Download</a>



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
                                <p>There are no lessons for this class yet</p>
                            )}


                            {/* this could probably be a component */}
                            {quizzes && quizzes.length > 0 ? (
                                <AccordionContainer title="Quizzes">
                                    {quizzes.map((quiz, index) => (
                                        <>
                                            <h4>{quiz.title}</h4>
                                            <h4>{quiz.description}</h4>
                                            {!state.teacher && !quiz.user_quiz_take && (


                                                <Button title='Take Quiz' onClick={() => handleRedirectTakeQuiz(quiz.id!)}></Button>

                                            )}
                                            {quiz.user_quiz_take && !state.teacher && (
                                                <>

                                                    <div className={styles.xpBox}>
                                                        <p >XP collected:</p>
                                                        <PointsBoxGroup
                                                            total_user_points={quiz.user_quiz_take.total_user_points}
                                                            total_points={quiz.user_quiz_take.total_points}
                                                        />
                                                    </div>
                                                </>
                                            )}


                                            {state.teacher && (
                                                <Button title='Results' onClick={() => handleResultsRedirect(quiz.id!)}></Button>
                                            )}


                                        </>

                                    ))}
                                </AccordionContainer>
                            ) : state.teacher ? (
                                <p>There are no quizzes for this class yet</p>
                            ) : (
                                <p>There are no quizzes for this class yet</p>
                            )}

                        </>

                    )}

                </>
            )}

        </>
    )
}
export default ViewFullClass;
