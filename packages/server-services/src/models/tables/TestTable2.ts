import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TestTable2 {

    @XViewColumn()
    aname: string | null;
}