import { CourseProgressDTO } from './CourseProgressDTO';
import { AvailableCourseDTO } from './AvailableCourseDTO';
import { CurrentTasksDTO } from './CurrentTasksDTO';
import { QuestionDTO } from './QuestionDTO';

export type OverviewPageDTO = {

    testQuestionDTO: QuestionDTO;
    developmentChartData: any;
    currentTasks: CurrentTasksDTO;
    tipOfTheDay: string;
    currentCourseProgress: CourseProgressDTO;
    recommendedCourses: AvailableCourseDTO[];
}