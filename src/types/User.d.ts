interface UserRequest { 
    email: string;
    nickname: string;
    name: string
    cognito_username: string
    teacher?: boolean
}
interface UserResponse {
    id: string,
    email: string,
    name: string,
    nickname: string,
    cognito_username?: string
}
interface UserOnModuleResponse {
    users_on: UserResponse[]
    users_not_on: UserResponse[]
    module: ModuleResponse
    teacher: string
}

interface UserModuleRequest {
    users: UserModule[]
}
interface UserModule{
    user_id: string,
}