import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class CourseItemEditDTO {
    examVersionId: number;
    videoVersionId: number;
    title: string;
    subtitle: string;
    videoLengthSeconds: number | null;
    videoUrl: string | null;
    
    questions: QuestionEditDataDTO[];
}