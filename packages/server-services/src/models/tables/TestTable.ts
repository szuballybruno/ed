import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TestTable {

    @XViewColumn()
    aname: string | null;
}