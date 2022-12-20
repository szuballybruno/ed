import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class TestTable {

    @XViewColumn()
    aname: string | null;
}