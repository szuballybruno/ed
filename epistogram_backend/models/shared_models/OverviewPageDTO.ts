import { CourseItemDTO } from "./CourseItemDTO";
import { CourseShortDTO } from "./CourseShortDTO";
import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { ModuleDTO } from "./ModuleDTO";
import { QuestionDTO } from "./QuestionDTO";

export type OverviewPageDTO = {

    testQuestionDTO: QuestionDTO;
    developmentChartData: any;
    currentTasks: CurrentTasksDTO;
    tipOfTheDay: string;

    modules: ModuleDTO[];

    recommendedCourses: CourseShortDTO[];
}