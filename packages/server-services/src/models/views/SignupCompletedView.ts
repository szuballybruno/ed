import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class SignupCompletedView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    isSignupComplete: boolean;
}