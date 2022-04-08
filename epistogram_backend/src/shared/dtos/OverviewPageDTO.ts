import { CourseProgressDTO } from './CourseProgressDTO';
import { CourseShortDTO } from './CourseShortDTO';
import { CurrentTasksDTO } from './CurrentTasksDTO';
import { QuestionDTO } from './QuestionDTO';

export type OverviewPageDTO = {

    testQuestionDTO: QuestionDTO;
    developmentChartData: any;
    currentTasks: CurrentTasksDTO;
    tipOfTheDay: string;
    currentCourseProgress: CourseProgressDTO;
    recommendedCourses: CourseShortDTO[];
}