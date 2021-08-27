import { getTypeORMConnection } from '../database';
import { User } from '../models/entity/User';
import { toAdminPageUserDTO } from './mappings';

export const getAdminPageUsersList = async (userId: number, searchText: string) => {

    const users = await getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.organization", "org")
        .leftJoinAndSelect("user.tasks", "tasks")
        .getMany();

    return users
        .map(x => toAdminPageUserDTO(x));
}