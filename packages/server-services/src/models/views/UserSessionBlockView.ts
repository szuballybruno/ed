import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';



export class UserSessionBlockView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    averageSessionBlock: string;
}