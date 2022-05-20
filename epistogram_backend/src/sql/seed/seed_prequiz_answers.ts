import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { PrequizQuestionsSeedDataType } from './seed_prequiz_questions';

export const getPrequizAnswersSeedData = (prequizQuestions: PrequizQuestionsSeedDataType) => getSeedList<PrequizAnswer>()({
    prequiz_answer_1: {
        text: 'A munkámban van szükségem rá',
        questionId: prequizQuestions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_2: {
        text: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak',
        questionId: prequizQuestions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_3: {
        text: 'A személyes fejlődésem miatt szeretném elsajátítani',
        questionId: prequizQuestions.prequiz_question_2.id,
        value: null
    },
    prequiz_answer_4: {
        text: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál',
        questionId: prequizQuestions.prequiz_question_2.id,
        value: null
    }
});

export type PrequizAnswersSeedDataType = ReturnType<typeof getPrequizAnswersSeedData>;