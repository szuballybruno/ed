import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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