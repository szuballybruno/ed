
import { QuestionType } from '../../models/entity/QuestionType';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<QuestionType>()({
    single_answer: {
        name: 'single_answer'
    },
    multi_answer: {
        name: 'multiple_answers'
    }
});

export default list;