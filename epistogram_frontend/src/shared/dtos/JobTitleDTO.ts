import { JobTitle } from "../../models/entity/JobTitle";
import { Id } from "../types/versionId";

export type JobTitleDTO = {
    name: string;
    id: Id<JobTitle>;
}