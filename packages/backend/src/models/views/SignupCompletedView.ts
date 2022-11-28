import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class SignupCompletedView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    isSignupComplete: boolean;
}