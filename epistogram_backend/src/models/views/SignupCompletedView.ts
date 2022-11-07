import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class SignupCompletedView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    isSignupComplete: boolean;
}