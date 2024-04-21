
interface User {
    id: string,
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
    users: UserModule[]
}
interface UserModule{
    user_id: string,
}
interface UserBadgesResponse extends User {
    badges: Badge[]
}




