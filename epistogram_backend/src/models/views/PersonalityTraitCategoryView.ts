import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class PersonalityTraitCategoryView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    title: string;

    @ViewColumn()
    minLabel: string;

    @ViewColumn()
    maxLabel: string;

    @ViewColumn()
    minDescription: string;

    @ViewColumn()
    maxDescription: string;
    
    @ViewColumn()
    maxTipsCount: number;

    @ViewColumn()
    minTipsCount: number;
}
