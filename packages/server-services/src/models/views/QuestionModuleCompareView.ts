import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class QuestionModuleCompareView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    pretestExamVersionId: Id<'PretestExamVersion'>;

    @XViewColumn()
    pretestExamScorePercentage: number;

    @XViewColumn()
    finalExamVersionId: Id<'FinalExamVersion'>;

    @XViewColumn()
    finalExamScorePercentage: number;
}