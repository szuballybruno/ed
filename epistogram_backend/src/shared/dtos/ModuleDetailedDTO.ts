import { Module } from "../../models/entity/module/Module";
import { Id } from "../types/versionId";

export class ModuleDetailedDTO {
    id: Id<Module>;
    name: string;
    description: string;
    imageFilePath: string | null;
}