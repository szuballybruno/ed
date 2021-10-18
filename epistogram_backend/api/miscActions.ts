import { JobTitle } from "../models/entity/JobTitle";
import { staticProvider } from "../staticProvider";
import { ActionParamsType } from "../utilities/helpers";

export const getJobTitles = async (params: ActionParamsType) => {

    return await staticProvider
        .ormConnection
        .getRepository(JobTitle)
        .find();
};