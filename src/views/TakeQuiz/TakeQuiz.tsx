import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@components/Button/Button';
import RoutesChoice from '@enums/Routes';
import CheckboxInput from '@components/Inputs/CheckboxInput/CheckBoxInput';
import { useAppDispatch } from '@store/hooks';
import { quizState, setQuiz, setQuizWithChoice, setQuizWithQuestions, takeQuiz, userQuestions, getQuiz, clearQuiz } from '@store/quiz/quizSlice';
import styles from "@views/TakeQuiz/TakeQuiz.module.scss"
import PointsBox from '@components/PointsBox/PointsBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function TakeQuiz() {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const params = useParams();

    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useAppDispatch();
    const quiz = useSelector(quizState);
    const userQuestionChoices = useSelector(userQuestions)

    const [totalUserPoints, setTotalUserPoints] = useState<number>(0)
    const [quizId, setQuizId] = useState('');

    const [moduleId, setModuleId] = useState('');

    const renderChoices = (question: Question) => {
        return (
            question.id && question.choices && question.choices.map((choice, choiceKey) => (
                <div key={choiceKey} className={styles.choiceWrapper} onClick={() => handleChoiceChange(question.id!, choice.id!)}>
                    <CheckboxInput
                        title={choice.description ? choice.description : ""}
                        onChangeChoice={() => handleChoiceChange(question.id!, choice.id!)}
                        checked={isChoiceChecked(question.id!, choice.id!)} // Check if the choice is checked based on userQuestions
                    />

                </div>
            ))
        );
    };

    const isChoiceChecked = (questionId: string, choiceId: string): boolean => {
        if (!userQuestions) return false; // Return false if userQuestions is not available
        if (userQuestionChoices) {
            const userQuestion = userQuestionChoices.questions.find(q => q.id === questionId);
            console.log(userQuestion?.choices)

            if (userQuestion && userQuestion.choices) {
                console.log(userQuestion && userQuestion.choices.some(c => c.id === choiceId))


                return userQuestion && userQuestion.choices.some(c => c.id === choiceId);

            }
        }


        return false
    };

    const handleSubmit = () => {
        const userQuestionRequest: UserQuestionRequest = {
            quiz_id: quizId,
            userQuestions: userQuestionChoices
        }
        console.log("userQuestion request is ", userQuestionRequest)
        setLoading(true)

        dispatch(takeQuiz(userQuestionRequest))
            .unwrap()
            .then((res) => {
                setTotalUserPoints(res.total_user_points)
                dispatch(clearQuiz())
                const path = generatePath(RoutesChoice.ViewFullClass, { moduleId });
                navigate(path);
                setLoading(false)

            })
            .catch((error) => {
                setLoading(false)
                setError("there was an errorr with your quiz please contact an adminstrator")
            })
    }


    const handleChoiceChange = (questionId: string, choiceId: string) => {
        // Dispatch an action to update the Redux store with the selected choice
        console.log("Choice change ran")
        dispatch(setQuizWithChoice({ questionId, choiceId }));
    }


    useEffect(() => {
        console.log(params.moduleId);
        if (params.moduleId && params.quizId) {
            console.log("quizId is ", params.quizId); // Use params.quizId directly
            setQuizId(params.quizId)
            setModuleId(params.moduleId)

            console.log(params)
            if (!quiz) {
                dispatch(getQuiz(params.quizId))
                setLoading(false)


            }
            else {
                setLoading(false)

            }

        }
    }, [params.quizId]);




    return (
        <>
            {quiz && quiz.id === params.quizId ? (
                <div className={styles.container}>
                    <h1>{quiz.title}</h1>
                    <div className={styles.inputContainer}>
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                            </>
                        ) : (
                            <>
                                {quiz.questions && quiz.questions.length !== 0 && (
                                    <div>
                                        {quiz.questions.map((question, key) => (
                                            <div key={key}>
                                                <div className={styles.questionBox}>
                                                    <h3>Question {key + 1}</h3>
                                                    <PointsBox points={question.points}></PointsBox>
                                                </div>
                                                <h4>{question.description}</h4>
                                                {question.id && question.choices && (
                                                    <>
                                                        {renderChoices(question)}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {error && <p>{error}</p>}
                            </>
                        )}
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                            </>
                        ) : (
                            <div className={styles.buttonContainer}>
                                <Button title="submit" onClick={() => handleSubmit()}></Button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <p>You can only take one quiz at a time. Please finish the current quiz {quiz?.title} </p>
                </>
            )}
        </>
    );
}
export default TakeQuiz;
