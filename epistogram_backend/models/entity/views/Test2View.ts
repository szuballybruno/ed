import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    expression: `
    SELECT 
        *
    FROM public."video"
`
})
export class Test2View {

    @ViewColumn()
    id: number;
}