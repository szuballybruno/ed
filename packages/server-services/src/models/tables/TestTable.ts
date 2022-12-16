import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class TestTable {

    @XViewColumn()
    aname: string | null;
}