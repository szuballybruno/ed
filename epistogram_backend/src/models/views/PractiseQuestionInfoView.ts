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
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    practiseAnswerCount: number;
    
    @XViewColumn()
    isCorrect: boolean;
    
    @XViewColumn()
    givenAnswerDate: Date;
    
    @XViewColumn()
    isPractise: boolean;
}