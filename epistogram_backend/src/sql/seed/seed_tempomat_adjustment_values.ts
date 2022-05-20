import { TempomatAdjustmentValue } from '../../models/entity/TempomatAdjustmentValue';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getTempomatAdjustmentValueSeedData = (seed_prequiz_answers: any) => getSeedList<TempomatAdjustmentValue>()({

    // AUTO

    // 1: 'A munkámban van szükségem rá'
    tempomat_adjustment_value_1: {
        minValue: 20, // min_value,
        maxValue: 60, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_1.id, // prequiz_answer_id
        tempomatMode: 'auto' // tempomat_mode 
    },

    // 2: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak'
    tempomat_adjustment_value_2: {
        minValue: 15, // min_value,
        maxValue: 50, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_2.id, // prequiz_answer_id
        tempomatMode: 'auto' // tempomat_mode 
    },

    // 3: 'A személyes fejlődésem miatt szeretném elsajátítani'
    tempomat_adjustment_value_3: {
        minValue: 10, // min_value,
        maxValue: 40, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_3.id, // prequiz_answer_id
        tempomatMode: 'auto' // tempomat_mode 
    },

    // 4: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál'
    tempomat_adjustment_value_4: {
        minValue: 5, // min_value,
        maxValue: 25, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_4.id, // prequiz_answer_id
        tempomatMode: 'auto' // tempomat_mode 
    },

    // BALANCED

    // 1: 'A munkámban van szükségem rá'
    tempomat_adjustment_value_5: {
        minValue: 10, // min_value,
        maxValue: 40, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_1.id, // prequiz_answer_id
        tempomatMode: 'balanced' // tempomat_mode 
    },

    // 2: 'Arra, hogy a segítségével feljebb léphessek, jobb munkát találhassak'
    tempomat_adjustment_value_6: {
        minValue: 5, // min_value,
        maxValue: 30, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_2.id, // prequiz_answer_id
        tempomatMode: 'balanced' // tempomat_mode 
    },

    // 3: 'A személyes fejlődésem miatt szeretném elsajátítani'
    tempomat_adjustment_value_7: {
        minValue: 0, // min_value,
        maxValue: 20, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_3.id, // prequiz_answer_id
        tempomatMode: 'balanced' // tempomat_mode 
    },

    // 4: 'Csak szeretnék valami újat tanulni, a tanulás öröme motivál'
    tempomat_adjustment_value_8: {
        minValue: 0, // min_value,
        maxValue: 15, // max_value
        prequizAnswerId: seed_prequiz_answers.prequiz_answer_4.id, // prequiz_answer_id
        tempomatMode: 'balanced' // tempomat_mode 
    }
});

export type TempomatAdjustmentValueSeedDataType = ReturnType<typeof getTempomatAdjustmentValueSeedData>;