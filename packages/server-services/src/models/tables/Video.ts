import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Video {

    @XViewColumn()
    id: Id<'Video'>;
}