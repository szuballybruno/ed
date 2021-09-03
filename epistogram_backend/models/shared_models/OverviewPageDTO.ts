import { CourseItemDTO } from "./CourseItemDTO";
import { CourseShortDTO } from "./CourseShortDTO";
import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { QuestionDTO } from "./QuestionDTO";

export type OverviewPageDTO = {

    testQuestionDTO: QuestionDTO;
    developmentChartData: any;
    currentTasks: CurrentTasksDTO;
    tipOfTheDay: string;

    currentCourseItems: CourseItemDTO[];

    recommendedCourses: CourseShortDTO[];
}