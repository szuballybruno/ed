import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';



export class UserSessionBlockView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    averageSessionBlock: string;
}