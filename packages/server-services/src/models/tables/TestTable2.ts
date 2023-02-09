import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class TestTable2 {

    @XViewColumn()
    aname: string | null;
}