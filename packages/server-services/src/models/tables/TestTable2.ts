import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class TestTable2 {

    @XViewColumn()
    aname: string | null;
}