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
    ViewFullClass = '/teacher/view-full-class/:moduleId'
}

export default RoutesChoice;
