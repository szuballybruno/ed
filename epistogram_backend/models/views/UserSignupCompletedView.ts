import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserSignupCompletedView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    isCompletedSignup: boolean;
}