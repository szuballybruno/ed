
import { QuestionType } from '../../models/entity/misc/QuestionType';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getQuestionTypeSeedData = () => getSeedList<QuestionType>()({
    single_answer: {
        name: 'single_answer'
    },
    multi_answer: {
        name: 'multiple_answers'
    }
});

export type QuestionTypeSeedDataType = ReturnType<typeof getQuestionTypeSeedData>;