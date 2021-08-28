
import { User } from '../models/entity/User';
import { staticProvider } from '../staticProvider';
import { toAdminPageUserDTO } from './mappings';

export const getAdminPageUsersList = async (userId: number, searchText: string) => {

    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.organization", "org")
        .leftJoinAndSelect("user.tasks", "tasks")
        .getMany();

    return users
        .map(x => toAdminPageUserDTO(x));
}