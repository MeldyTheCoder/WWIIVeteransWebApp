
interface IPerson {
    id?: number
    firstName: string
    lastName: string
    surname?: string
    description: string
    quote: string
    photoUrl?: string
    yearsOfBattle: number[]
    dateOfBirth: Date | string
    dateOfDeath?: Date | string
}

export default IPerson