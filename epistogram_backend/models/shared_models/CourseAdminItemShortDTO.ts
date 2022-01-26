import { CourseAdminItemQuestionDTO } from "./CourseAdminItemQuestionDTO";
import { CourseItemStateType, CourseItemType } from "./types/sharedTypes";

export class CourseAdminItemShortDTO {
    id: number;
    moduleId: number;
    title: string;
    subTitle: string;
    orderIndex: number;
    descriptorCode: string;
    type: CourseItemType;
    questionCount: number;
    videoLength: number;
    isFinalExam: boolean;
    questions: CourseAdminItemQuestionDTO[];
}