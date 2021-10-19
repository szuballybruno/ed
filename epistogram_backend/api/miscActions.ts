import { JobTitle } from "../models/entity/JobTitle";
import { staticProvider } from "../staticProvider";
import { ActionParamsType } from "../utilities/helpers";

export const getJobTitlesAction = async (params: ActionParamsType) => {

    return await staticProvider
        .ormConnection
        .getRepository(JobTitle)
        .find();
};