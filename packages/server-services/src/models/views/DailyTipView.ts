import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class DailyTipView {

    @XViewColumn()
    dailyTipId: Id<'DailyTip'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    description: string;

    @XViewColumn()
    personalityTraitCategoryId: Id<'PersonalityTraitCategory'>;

    @XViewColumn()
    videoFilePath: string;

    @XViewColumn()
    lastOccurrenceDate: Date;

    @XViewColumn()
    isNew: boolean;

    @XViewColumn()
    isCurrentTip: boolean;

    @XViewColumn()
    tipIsMax: boolean;

    @XViewColumn()
    userChoiceInCategoryIsMax: boolean;
}