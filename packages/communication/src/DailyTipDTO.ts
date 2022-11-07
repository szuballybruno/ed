import { Id } from '@episto/commontypes';

export class DailyTipDTO {
    id: Id<'DailyTip'>;
    description: string;
    videoUrl: string;
}