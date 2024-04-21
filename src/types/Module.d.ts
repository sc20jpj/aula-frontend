interface Module {
    id?: string
    name: string
    code: string
}

interface ModuleResponse  extends Module{
    teacher: boolean
    points: number
}

interface LessonRequest {
    name: string
    description: string
    files: Base64File[]
}


interface LessonWithFiles {
    name: string
    description: string
    files: DocumentObject[]
}

interface DocumentObject {
    id: string,
    name: string,
    s3_url: string,
    file_type: string
}

interface Base64File {
    name: string
    file_type: string
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