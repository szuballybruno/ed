import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class QuestionVersion {

    @XViewColumn()
    id: Id<'QuestionVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionDataId: Id<'QuestionData'>;

    @XViewColumn()
    personalityTraitCategoryId: Id<'PersonalityTraitCategory'> | null;
}