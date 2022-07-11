import { Role } from "../../models/entity/authorization/Role";
import { Id } from "../types/versionId";

export type RoleDTO = {
    id: Id<Role>;
    name: string;
}