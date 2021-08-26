import {GetUserCoursesDTO} from "../models/shared_models/GetUserCoursesDTO";
import {toCourseAdminDTO} from "./mappings";
import {getTypeORMConnection} from "../database";
import {Course} from "../models/entity/Course";
import {sendInvitaitionMailAsync} from "./emailService";

export const getAdminCoursesAsync = async (userId: number, dto: GetUserCoursesDTO) => {
    await sendInvitaitionMailAsync("", "spenciman@gmail.com", "Dikbuh Sinath")
    const aggregatedCourses = await getTypeORMConnection()
        .getRepository(Course)
        .find()
    return aggregatedCourses.map(course => toCourseAdminDTO(course));
}
