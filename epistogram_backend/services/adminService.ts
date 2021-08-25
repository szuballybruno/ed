import { User } from '../models/entity/User';
import { getTypeORMConnection } from '../server';

export const getAdminPageUsersList = async (userId: number, searchText: string) => {

    const users = await getTypeORMConnection()
        .getRepository(User)
        .find();

    return users;

    // switch (user.userData.role) {

    //     case "admin":
    //         return await aggregateAllUsers();

    //     case "owner":
    //         return await aggregateUsersByOrganization();

    //     case "supervisor":
    //         return await aggregateUsersByGroup();

    //     default:
    //         throw new Error("A felhasználó egyik rolenak sem felel meg")
    // }
}