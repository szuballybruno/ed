import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    expression: `
    SELECT * FROM public."test2view"
`
})
export class Test3View {

    @ViewColumn()
    id: number;
}