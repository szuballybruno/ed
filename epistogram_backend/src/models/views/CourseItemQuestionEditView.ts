import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { AnswerData } from '../entity/answer/AnswerData';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemQuestionEditView {

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    videoTitle: string;

    @ViewColumn()
    @XViewColumn()
    videoSubtitle: string;

    @ViewColumn()
    @XViewColumn()
    videoFilePath: string;

    @ViewColumn()
    @XViewColumn()
    videoLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    courseTitle: string;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    examTitle: string;

    @ViewColumn()
    @XViewColumn()
    questionId: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionShowUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    answerId: number;

    @ViewColumn()
    @XViewColumn()
    answerText: string;

    @ViewColumn()
    @XViewColumn()
    answerIsCorrect: boolean;
}