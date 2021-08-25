import {IdType} from "../../shared_models/types/sharedTypes";
import {GetUserCoursesDTO} from "../models/shared_models/GetUserCoursesDTO";
import {useCollection} from "./persistance";
import {toCourseAdminDTO} from "./mappings";
import {Course} from "./userCoursesService";

export const getAdminCoursesAsync = async (userId: IdType, dto: GetUserCoursesDTO) => {
    const courses = await useCollection("courses")
    const aggregatedCourses = await courses.aggregateAsync([{
        '$project': {
            '_id': 1,
            'name': 1,
            'category': 1,
            'videosCount': 1
        }
    }]) as Course[]
    return aggregatedCourses.map(course => toCourseAdminDTO(course));
}
