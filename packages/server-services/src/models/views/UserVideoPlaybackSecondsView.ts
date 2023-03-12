import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserVideoPlaybackSecondsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    totalPlaybackSeconds: number;
}