export type user = {
    _id: string
    active: boolean
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: string
    innerRole: string
    organizationName: string
    tasks: {
        name: string,
        addedBy: string,
        status: string,
        due: string
    }[]
}
