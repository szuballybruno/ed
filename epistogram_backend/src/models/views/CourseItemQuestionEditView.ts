import { ViewColumn, ViewEntity } from 'typeorm';
import { Answer } from '../entity/Answer';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemQuestionEditView {

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    videoTitle: string;

    @ViewColumn()
    videoSubtitle: string;

    @ViewColumn()
    videoFilePath: string;

    @ViewColumn()
    videoLengthSeconds: number;

    @ViewColumn()
    courseTitle: string;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    examTitle: string;

    @ViewColumn()
    questionId: number;

    @ViewColumn()
    questionText: string;

    @ViewColumn()
    questionShowUpTimeSeconds: number;

    @ViewColumn()
    answerId: number;

    @ViewColumn()
    answerText: string;

    @ViewColumn()
    answerIsCorrect: boolean;
}