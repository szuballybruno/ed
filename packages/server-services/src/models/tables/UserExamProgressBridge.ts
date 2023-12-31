import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserExamProgressBridge {

    @XViewColumn()
    id: Id<'UserExamProgressBridge'>;

    @XViewColumn()
    completionDate: Date | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;
}