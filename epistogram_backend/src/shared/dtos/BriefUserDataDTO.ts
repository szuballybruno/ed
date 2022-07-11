import { User } from "../../models/entity/User"
import { Id } from "../types/versionId"

export type BriefUserDataDTO = {
    id: Id<'User'>,
    firstName: string,
    lastName: string,
    fullName: string
}