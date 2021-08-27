import { CourseShortDTO } from "./CourseShortDTO";
import { CurrentTasksDTO } from "./CurrentTasksDTO";
import { ExamDTO } from "./ExamDTO";
import { QuestionDTO } from "./QuestionDTO";
import { VideoDTO } from "./VideoDTO";

export type OverviewPageDTO = {
    testQuestionDTO: QuestionDTO,
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