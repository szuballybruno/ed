import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<PrequizQuestion>()({
    prequiz_question_1: {
        text: 'Tapasztalat szinted?',
        isNumericAnswer: true,
        minValue: 1,
        maxValue: 10,
        stepValue: 1,
        minLabel: 'Nem érzem tapasztaltnak magam',
        maxLabel: 'Tapasztaltnak érzem magam',
        valuePostfix: null
    },
    prequiz_question_2: {
        text: 'Mire szeretnéd használni a kurzuson tanultakat?',
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

export default list;