// routes.ts
enum RoutesChoice {
    SignIn = '/',
    SignUp = '/signUp',
    StudentPortal = '/student',
    Unauthorised = '/unauthorised',
    Incomplete = '/incomplete',
    AddModule = '/teacher/add-module',
    ViewClasses='/classes',
    ViewClassLeaderboard='/class-leaderboard/:moduleId',
    ViewLeaderboard='/leaderboard',
    TeacherPortal='/teacher',
    AddLesson = '/teacher/add-lesson/:moduleId',
    AddBadge = '/teacher/add-badge',
    ViewClassResults = '/teacher/view-class-results/:quizId',
    AddQuiz = '/teacher/add-quiz/:moduleId',
    TakeQuiz = '/teacher/take-quiz/:moduleId/:quizId',
    ViewFullClass = '/teacher/view-full-class/:moduleId',
    Profile = '/profile'
}

export default RoutesChoice;
