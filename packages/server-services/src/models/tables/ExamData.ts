import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ExamData {

    @XViewColumn()
    id: Id<'ExamData'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    isFinal: boolean;

    @XViewColumn()
    subtitle: string | null;

    @XViewColumn()
    description: string | null;

    @XViewColumn()
    thumbnailUrl: string | null;

    @XViewColumn()
    orderIndex: number | null;

    @XViewColumn()
    retakeLimit: number | null;

    @XViewColumn()
    acceptanceThreshold: number | null;
}