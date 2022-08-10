import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getPrequizQuestionsSeedData = () => getSeedList<PrequizQuestion>()({
    prequiz_question_1: {
        text: 'Mennyire érzed magad tapasztaltnak?',
        isNumericAnswer: true,
        minValue: 1,
        maxValue: 10,
        stepValue: 1,
        minLabel: 'Nem érzem tapasztaltnak magam',
        maxLabel: 'Tapasztaltnak érzem magam',
        valuePostfix: null
    },
    prequiz_question_2: {
        text: 'Mire szeretnéd használni a kurzuson tanultakat? (Azt válaszd, amelyik a leginkább közelebb áll a célodhoz)',
        isNumericAnswer: false,
        minValue: null,
        maxValue: null,
        stepValue: null,
        minLabel: null,
        maxLabel: null,
        valuePostfix: null
    },
    prequiz_question_3: {
        text: 'Mennyi időt tudsz hetente rászánni?',
        isNumericAnswer: true,
        minValue: 1,
        maxValue: 10,
        stepValue: 1,
        minLabel: 'Kevesebb időt tudok tanulással tölteni',
        maxLabel: 'Több időt tudok tanulással tölteni',
        valuePostfix: 'óra'
    }
});

export type PrequizQuestionsSeedDataType = ReturnType<typeof getPrequizQuestionsSeedData>;