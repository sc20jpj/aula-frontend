interface UserRequest { 
    password: string;
    email: string;
    nickname: string;
}
interface UserResponse {
    id: string,
    email: string,
    name: string,
    nickname: string,
    teacher: boolean
}