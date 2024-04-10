import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { API } from '@lib/APi';
import TextInput from '@components/Inputs/TextInput/TextInput';
import Button from '@components/Button/Button';
import RoutesChoice from '@enums/Routes';
import styles from "@views/AddModule/AddModule.module.scss"
import TextAreaInput from '@components/Inputs/TextAreaInput/TextAreaInput';
import NumberInput from '@components/Inputs/NumberInput/NumberInput';
import CheckboxInput from '@components/Inputs/CheckboxInput/CheckBoxInput';

function AddQuiz() {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const params = useParams();

    const [error, setError] = useState<string>("")

    const [quiz, setQuiz] = useState<QuizRequest>({
        quiz: { title: '', description: ''},
        questions: []
    },
    )
    const [moduleId, setModuleId] = useState('');

    const handleSubmit = () => {

        API.postQuiz(moduleId, quiz)
            .then((res) => {
                navigate(RoutesChoice.TeacherPortal)
            }).catch((res) => {
                console.log(res)
                // setError(res)
            })
        


    }

    const handleAddQuestion = () => {
        const newQuestion: QuestionInfo = { question: { description: '', points: 0 }, choices: [] };
        setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    };

    const handleAddChoice = (questionIndex: number) => {
        // Create an empty choice
        const newChoice = { description: '', correct: false };

        const updatedQuestions = quiz.questions.map((question, index) => {
            if (index === questionIndex) {
                return { ...question, choices: [...question.choices, newChoice] };
            }
            return question;
        });

        // Update the quiz state with the modified questions array
        setQuiz({ ...quiz, questions: updatedQuestions });
    };
    const handleTitleChange = (value: string) => {
        setQuiz(prevState => ({
            ...prevState,
            quiz: {
                ...prevState.quiz,
                title: value // Update the title in the quiz state
            }
        }));
    };
    
    const handleDescriptionChange = (value: string) => {
        setQuiz(prevState => ({
            ...prevState,
            quiz: {
                ...prevState.quiz,
                description: value // Update the description in the quiz state
            }
        }));
    };
    

    const handleAddDescription = (value: string, questionIndex: number) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].question.description = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleAddPoints = (value: string, questionIndex: number) => {
        const points = parseFloat(value);


        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].question.points = points;

        
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleAddChoiceDescription = (value: string, questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].choices[choiceIndex].description = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleCorrectAnswerChange = (isChecked: boolean, questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].choices[choiceIndex].correct = isChecked;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    useEffect(() => {
        console.log(params.moduleId);
        if (params.moduleId) {
            setModuleId(params.moduleId);
        }
    }, [params.moduleId]);
    return (
        <>
        


            <div className={styles.container}>
                <h1>Add Quiz</h1>

                <TextInput title='Title' onChange={handleTitleChange} />
                <TextAreaInput title='description' onChange={handleDescriptionChange}/> 

                <div className={styles.inputContainer}>


                    {quiz.questions && quiz.questions.length !== 0 && (
                        <>
                            <h2>Questions</h2>
                            {quiz.questions.map((question, key) => (
                                <div key={key}>

                                    <h3>Question {key + 1}</h3>
                                    <TextAreaInput
                                        title='Description'
                                        onChange={(value) => handleAddDescription(value, key)}
                                    />

                                    <NumberInput
                                        title='Points'
                                        onChange={(value) => handleAddPoints(value, key)}
                                    />


                                    {question.choices.map((choice, choiceKey) => (
                                        <>
                                            <h4>Choices</h4>
                                            <div>
                                                <TextAreaInput
                                                    title='Description'
                                                    onChange={(value) => handleAddChoiceDescription(value, key, choiceKey)}
                                                />

                                                <CheckboxInput
                                                    title='Correct Answer'
                                                    onChange={(value) => handleCorrectAnswerChange(value, key, choiceKey)}
                                                />


                                            </div>
                                        </>


                                    ))}

                                    <Button title="Add Choice" onClick={() => handleAddChoice(key)}></Button>


                                </div>
                            ))}
                        </>

                    )}



                    <Button title="Add" onClick={() => handleAddQuestion()}></Button>


                    {error && (
                        <p>{error}</p>
                    )}
                    <div className={styles.buttonContainer}>
                        <Button title="submit" onClick={() => handleSubmit()}></Button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default AddQuiz;
