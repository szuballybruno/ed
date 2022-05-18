import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_prequiz_questions from './seed_prequiz_questions';

const list = getSeedList<PrequizAnswer>()({
    prequiz_answer_1: {
        text: 'A munkámban van szükségem rá',
        questionId: seed_prequiz_questions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_2: {
        text: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak',
        questionId: seed_prequiz_questions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_3: {
        text: 'A személyes fejlődésem miatt szeretném elsajátítani',
        questionId: seed_prequiz_questions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_4: {
        text: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál',
        questionId: seed_prequiz_questions.prequiz_question_2.id,
        value: null
    }
});

export default list;