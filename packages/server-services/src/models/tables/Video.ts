import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Video {

    @XViewColumn()
    id: Id<'Video'>;
}