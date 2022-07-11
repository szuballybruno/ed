import { Course } from "../../models/entity/course/Course";
import { Id } from "../types/versionId";

export class CourseShopItemListDTO {
    id: Id<Course>;
    title: string;
    coverImagePath: string | null;
}