import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class TeacherDTO {
    id: Id<User>;
    fullName: string;
}