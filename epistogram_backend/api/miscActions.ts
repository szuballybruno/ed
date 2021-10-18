import { JobTitle } from "../models/entity/JobTitle";
import { User } from "../models/entity/User";
import { toUserEditDTO } from "../services/mappings";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValue, withValueOrBadRequest } from "../utilities/helpers";

export const getJobTitlesAction = async (params: ActionParamsType) => {

    return await staticProvider
        .ormConnection
        .getRepository(JobTitle)
        .find();
};

export const getEditUserDataAction = async (params: ActionParamsType) => {

    const editedUserId = withValueOrBadRequest<number>(params.req.query?.editedUserId);

    const user = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.organization", "o")
        .leftJoinAndSelect("u.role", "r")
        .leftJoinAndSelect("u.jobTitle", "jt")
        .where("u.id = :userId", { userId: editedUserId })
        .getOneOrFail();

    return toUserEditDTO(user);
}