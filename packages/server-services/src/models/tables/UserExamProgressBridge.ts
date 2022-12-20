import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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