import { Course } from "../../models/entity/course/Course";
import { Id } from "../types/versionId";

export class CourseBriefData {
    id: Id<'Course'>;
    title: string;
}