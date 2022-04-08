import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class SignupCompletedView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    isSignupComplete: boolean;
}