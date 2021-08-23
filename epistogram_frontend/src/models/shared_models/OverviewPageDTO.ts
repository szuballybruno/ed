import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { TestQuestionDTO } from "./TestQuestionDTO";

export type OverviewPageDTO = {
    testQuestionDTO: TestQuestionDTO,
    developmentChartData: any,
    currentTasks: CurrentTasksDTO
    tipOfTheDay: string;
}