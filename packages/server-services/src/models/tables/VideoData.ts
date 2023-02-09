import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class VideoData {

    @XViewColumn()
    id: Id<'VideoData'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    subtitle: string | null;

    @XViewColumn()
    description: string | null;

    @XViewColumn()
    videoFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    thumbnailFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    videoFileLengthSeconds: number | null;

    @XViewColumn()
    audioText: string;
}