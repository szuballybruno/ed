import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PrequizQuestionView {

    @ViewColumn()
    @XViewColumn()
    questionId: number;
    
    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    isNumericAnswer: boolean;
    
    @ViewColumn()
    @XViewColumn()
    answerId: number;
    
    @ViewColumn()
    @XViewColumn()
    answerText: string;
    
    @ViewColumn()
    @XViewColumn()
    minValue: number;
    
    @ViewColumn()
    @XViewColumn()
    maxValue: number;

    @ViewColumn()
    @XViewColumn()
    stepValue: number;
    
    @ViewColumn()
    @XViewColumn()
    minLabel: string;

    @ViewColumn()
    @XViewColumn()
    maxLabel: string;

    @ViewColumn()
    @XViewColumn()
    valuePostfix: string;
}