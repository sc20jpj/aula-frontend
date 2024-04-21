
interface User {
    id?: string,
    email: string,
    name: string,
    nickname: string,
    cognito_username?: string
    teacher?: boolean
    points?: number
}
interface UsersAllResponse {
    users: User[]
}
interface UserOnModuleResponse {
    users_on: User[]
    users_not_on: User[]
    module: ModuleResponse
    teacher: string
}
interface UserModuleRequest {
    users: UserIdList[]
}
interface UserIdList{
    user_id: string,
}
interface UserModule extends UserIdList{
    module_id: string
    points: number
}



interface UserModuleResponse extends User {
    user_module: UserModule
}
interface UserBadgesResponse extends User {
    badges: Badge[]
}




