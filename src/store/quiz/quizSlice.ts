import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

import { useSelector } from 'react-redux';
import { API } from '@lib/APi';

interface QuizState {
    quiz?: Quiz
    userQuestions: UserQuestion

}

const initialState: QuizState = {
    userQuestions: { questions: [] as Question[] },
    quiz: undefined,
};

export const getQuiz = createAsyncThunk<
    Quiz,
    string
>(
    'Quiz/getQuiz',
    (quizId, thunkAPI) => {
        return API.getFullQuiz(quizId)
            .then((response) => {
                if (response.questions) {
                    thunkAPI.dispatch(setQuizWithQuestions(response.questions))

                }

                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);

export const takeQuiz = createAsyncThunk<
    UserQuizTake,
    UserQuestionRequest
>(
    'Quiz/takeQuiz',
    (userQuestion, thunkAPI) => {
        return API.takeQuiz(userQuestion.quiz_id, userQuestion.userQuestions)
            .then((response) => {
                return thunkAPI.fulfillWithValue(response);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
    }
);


export const QuizSlice = createSlice({
    name: 'quiz',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        clearQuiz: (state) => {
            state.quiz = undefined;
        },
        setQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quiz = action.payload;
        },
        setQuizWithQuestions: (state, action: PayloadAction<Question[]>) => {
            console.log("UserQuestions is ,", state.userQuestions)
            const newQuestions = action.payload.map(question => ({
                ...question,
                choices: []
            }));

            if (state.userQuestions) {
                console.log("UserQuestions is ,", state.userQuestions)
                state.userQuestions.questions = newQuestions;
            }


        },

        setQuizWithChoice: (state, action: PayloadAction<{ questionId: string, choiceId: string }>) => {
            const { questionId, choiceId } = action.payload;
        
            if (state.userQuestions) {
                const question = state.userQuestions.questions.find(question => question.id === questionId);
                
                if (question && question.choices) {
                    const existingIndex = question.choices.findIndex(choice => choice.id === choiceId);
        
                    if (existingIndex !== -1) {
                        question.choices.splice(existingIndex, 1);
                    } else {
                        question.choices.push({ id: choiceId });
                    }
                }
            }
        }
        



    },
    extraReducers: (builder) => {
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            state.quiz = action.payload
        });

    },

})

export const {
    setQuizWithChoice,
    setQuizWithQuestions,
    setQuiz,
    clearQuiz,


} = QuizSlice.actions

export const quizState = (state: RootState) => state.quiz.quiz;
export const userQuestions = (state: RootState) => state.quiz.userQuestions;
export default QuizSlice.reducer