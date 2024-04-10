interface QuizRequest {
    quiz: Quiz
    questions: QuestionInfo[]
}

interface Quiz {
    id?: string
    title: string
    description: string
    points?: number
    questions? : Question[]
    total_points?: number
    user_quiz_take?: UserQuizTake
}
interface UserQuizTake {
    total_points: number
    total_user_points: number
    name?: string
}
interface UserQuizTakeResponse extends Quiz  {
    user_quiz_takes: UserQuizTake[]
}
interface QuizResponse {
    quizzes: Quiz[]
}
interface UserQuestion{
    questions: Question[]
}
interface UserQuestionRequest {
    quiz_id: string
    userQuestions: UserQuestion
}

interface UserQuestionChoice {
    user_id: string;
    question_id: string;
    choice_id: string;
}

interface QuestionInfo {
    question: Quesiton
    choices: Choice[]
}
interface Question {
    id?: string
    description?: string
    points?: number
    choices?: Choice[]
}

interface Choice {
    id?: string
    description?: string
    correct?: boolean
}



