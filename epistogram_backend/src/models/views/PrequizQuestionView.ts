import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PrequizQuestionView {

    @ViewColumn()
    questionId: number;
    
    @ViewColumn()
    questionText: string;

    @ViewColumn()
    isNumericAnswer: boolean;
    
    @ViewColumn()
    answerId: number;
    
    @ViewColumn()
    answerText: string;
    
    @ViewColumn()
    minValue: number;
    
    @ViewColumn()
    maxValue: number;

    @ViewColumn()
    stepValue: number;
    
    @ViewColumn()
    minLabel: string;

    @ViewColumn()
    maxLabel: string;

    @ViewColumn()
    valuePostfix: string;
}