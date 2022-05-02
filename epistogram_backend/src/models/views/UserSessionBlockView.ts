import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserSessionBlockView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    averageSessionBlock: string;
}