import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PractiseQuestionInfoView {
    
    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    practiseAnswerCount: number;
    
    @XViewColumn()
    lastAnswerIsCorrect: boolean;
    
    @XViewColumn()
    lastAnswerDate: Date;
    
    @XViewColumn()
    lastAnswerIsPractise: boolean;
}