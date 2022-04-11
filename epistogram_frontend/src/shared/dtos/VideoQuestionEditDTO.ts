import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class VideoQuestionEditDTO {
    id: number;
    title: string;
    subtitle: string;
    courseName: string;
    description: string;
    videoLengthSeconds: number;
    videoUrl: string;
    questions: QuestionEditDataDTO[];
}