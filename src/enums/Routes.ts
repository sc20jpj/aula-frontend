// routes.ts
enum RoutesChoice {
    SignIn = '/signin',
    SignUp = '/signUp',
    StudentPortal = '/student',
    Unauthorised = '/unauthorised',
    Incomplete = '/incomplete',
    AddModule = '/teacher/add-module',
    ViewClasses='/classes',
    TeacherPortal='/teacher',
    AddLesson = '/teacher/add-lesson/:moduleId',
    ViewClassResults = '/teacher/view-class-results/:quizId',
    AddQuiz = '/teacher/add-quiz/:moduleId',
    TakeQuiz = '/teacher/take-quiz/:moduleId/:quizId',
    ViewFullClass = '/teacher/view-full-class/:moduleId'
}

export default RoutesChoice;
