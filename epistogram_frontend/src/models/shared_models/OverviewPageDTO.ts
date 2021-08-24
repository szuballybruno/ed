import { CourseItemShortDTO } from "./CourseItemShortDTO";
import { CourseShortDTO } from "./CourseShortDTO";
import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { TestQuestionDTO } from "./TestQuestionDTO";
import { IdType } from "./types/sharedTypes";

export type OverviewPageDTO = {
    testQuestionDTO: TestQuestionDTO,
    developmentChartData: any,
    currentTasks: CurrentTasksDTO
    tipOfTheDay: string;

    currentCourseItem?: CourseItemShortDTO;

    currentCourseId?: IdType;
    currentCourseItems: CourseItemShortDTO[];

    recommendedCourses: CourseShortDTO[];
}