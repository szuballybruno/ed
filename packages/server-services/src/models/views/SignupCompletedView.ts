import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class SignupCompletedView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    isSignupComplete: boolean;
}