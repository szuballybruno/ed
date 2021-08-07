export class User {
    email: string;
    password: string;
    id: number;

    constructor(email: string, password: string, id: number) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

const users = [] as User[];

export const getUserByEmail = (email: string, password: string) => {

    const user = users.filter(x => x.email == email && x.password == password)[0];
    return user;
}
export const insertUser = (user: User) => {

    users.push(user);
}