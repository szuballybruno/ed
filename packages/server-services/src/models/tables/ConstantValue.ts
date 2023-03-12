import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ConstantValue {

    @XViewColumn()
    id: Id<'ConstantValue'>;

    @XViewColumn()
    key: string;

    @XViewColumn()
    value: number;
}