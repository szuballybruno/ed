import { ViewColumn, ViewEntity } from "typeorm";
import { XViewColumn } from "../../services/XORM/XORMDecorators";

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class ExamDataView {

    @ViewColumn()
    @XViewColumn()
    questionId: number;

    @ViewColumn()
    @XViewColumn()
    examVersionId: number;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: number;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: number;

    @ViewColumn()
    @XViewColumn()
    questionDataId: number;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    imageUrl: string;

    @ViewColumn()
    @XViewColumn()
    showUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    typeId: number;

    @ViewColumn()
    @XViewColumn()
    answerId: number;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}