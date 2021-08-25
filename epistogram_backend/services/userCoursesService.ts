import { Course } from "../models/entity/Course";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { getTypeORMConnection } from "../server";
import { Connection } from "./connectMongo";
import { toCourseShortDTO } from "./mappings";
import { getUserDTOById } from "./userService";

export const getUserCoursesAsync = async (userId: number, dto: GetUserCoursesDTO) => {

    const user = (await getUserDTOById(userId))!;
    const organizationId = user.organizationId;
    const isRecommended = dto.isRecommended;
    const isFeatured = dto.isFeatured;
    const searchText = dto.searchText;
    const searchCategory = dto.searchCategory;

    const courses = await getTypeORMConnection()
        .getRepository(Course)
        .find();

    return courses.map(course => toCourseShortDTO(course));
}

export interface QuestionAnswer {
    answerValue: string;
    isTheAnswerTrue: boolean;
}

export interface ExamQuestion {
    questionValue: string;
    questionAnswers: QuestionAnswer[];
}

export interface Item {
    type: string;
    index: number;
    itemId: string;
    _id: string;
    videoWatchCount: number;
    overlays: string[];
    showAutomaticOverlay: boolean;
    title: string;
    subTitle: string;
    url: string;
    description: string;
    tags: string[];
    thumbnailUrl: string;
    length: number;
    examName: string;
    examQuestions: ExamQuestion[];
}

export interface FilteredGroup {
    groupId: string;
    groupRole: string;
}

export interface Course {
    _id: string;
    name: string;
    thumbnailUrl: string;
    category: string;
    items: Item[];
    groups: string[];
    filteredGroups: FilteredGroup[];
}
