interface BadgeRequest {
    name: string
    description: string
    user_id: string
    file: Base64File
}
interface Badge {
    name: string
    description: string
    user_id: string
    file: DocumentObject
}

