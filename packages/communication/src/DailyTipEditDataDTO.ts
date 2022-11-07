import { Id } from '@episto/commontypes';

export class DailyTipEditDataDTO {
    id: Id<'DailyTip'>;
    description: string;
    isLive: boolean;
}