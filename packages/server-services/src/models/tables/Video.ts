import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Video {

    @XViewColumn()
    id: Id<'Video'>;
}