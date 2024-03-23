interface ModuleRequest {
    id?: string
    name: string
    code: string
}

interface ModuleResponse {
    id?: string
    name: string
    code: string
    teacher: boolean
}

interface LessonRequest {
    name: string
    description: string
    files: Base64File[]
}


interface LessonWithFiles {
    name: string
    description: string
    files: Document[]
}

interface Document {
    id: string,
    name: string,
    s3_url: string,
}


interface Base64File {
    name: string
    base64: string
}
interface LessonResponse {
    id: string
    name: string
    description: string
}

interface ModuleWithLessonsResponse extends ModuleResponse{
    lessons: LessonWithFiles[]
}