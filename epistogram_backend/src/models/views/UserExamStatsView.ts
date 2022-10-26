import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserExamStatsView {

    @XViewColumn()
    
    userId: Id<'User'>;

    @XViewColumn()
    
    examId: Id<'Exam'>;

    @XViewColumn()
    
    examTitle: string;

    @XViewColumn()
    
    courseId: Id<'Course'>;

    @XViewColumn()
    
    correctAnswerRate: number;

    @XViewColumn()
    
    shouldPractiseExam: boolean;

    @XViewColumn()
    
    correctAnswerCount: string;

    @XViewColumn()
    
    examLengthSeconds: number;

    @XViewColumn()
    
    lastCompletionDate: Date;

    @XViewColumn()
    
    averageReactionTime: number;
}