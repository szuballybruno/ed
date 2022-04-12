import { ViewColumn, ViewEntity } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamView {

    @ViewColumn()
    userId: number;
    @ViewColumn()
    examId: number;
    
    @IsDeletedFlag('bool')
    @ViewColumn()
    isDeleted: boolean;
    
    @ViewColumn()
    title: string;
    @ViewColumn()
    subtitle: string;
    @ViewColumn()
    description: string;
    @ViewColumn()
    thumbnailUrl: string;
    @ViewColumn()
    orderIndex: number;
    @ViewColumn()
    isFinalExam: boolean;
    @ViewColumn()
    courseId: number;
    @ViewColumn()
    moduleId: number;
    @ViewColumn()
    retakeLimit: number;
    @ViewColumn()
    successfulCompletionCount: number;
    @ViewColumn()
    canRetake: boolean;

    @ViewColumn()
    correctAnswerCount: number;

    @ViewColumn()
    totalQuestionCount: number;

    @ViewColumn()
    correctAnswerRate: number;

    @ViewColumn()
    isCompletedPreviously: boolean;
}
