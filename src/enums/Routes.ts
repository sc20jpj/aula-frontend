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
    AddToModule = '/teacher/add-to-module/:moduleId'

}

export default RoutesChoice;
