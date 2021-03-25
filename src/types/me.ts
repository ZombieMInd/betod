export type LoginMe = {
    id: number
    name: string
}

export type MeType = {
    id: number
    userPicture?: string
    username: string
    firstName: string
    lastName: string
    recordBookNumber: number
    userDescription: string,
    courses: Array<number>,
}
