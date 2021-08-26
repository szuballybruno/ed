import { CourseItemShortDTO } from "./CourseItemShortDTO";
import { CourseShortDTO } from "./CourseShortDTO";
import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { ExamDTO } from "./ExamDTO";
import { TestQuestionDTO } from "./TestQuestionDTO";
import { VideoDTO } from "./VideoDTO";

export type OverviewPageDTO = {
    testQuestionDTO: TestQuestionDTO,
    developmentChartData: any,
    currentTasks: CurrentTasksDTO
    tipOfTheDay: string;

    currentCourseId?: number;
    
    currentCourseExam?: ExamDTO;
    currentCourseVideo?: VideoDTO;

    currentCourseExams: ExamDTO[];
    currentCourseVideos: VideoDTO[];

    recommendedCourses: CourseShortDTO[];
}