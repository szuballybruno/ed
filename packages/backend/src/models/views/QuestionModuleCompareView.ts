import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class QuestionModuleCompareView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    pretestExamVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    pretestExamScorePercentage: number;

    @XViewColumn()
    finalExamVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    finalExamScorePercentage: number;
}