import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ConnectionTestTable {

    @XViewColumn()
    columna: number | null;
}