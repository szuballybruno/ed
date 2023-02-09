import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserSpentTimeRatioView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @XViewColumn()
    totalQuestionElapsedTime: number;

    @XViewColumn()
    otherTotalSpentSeconds: number;
}