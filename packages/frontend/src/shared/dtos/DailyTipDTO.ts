import { Id } from '../types/versionId';

export class DailyTipDTO {
    id: Id<'DailyTip'>;
    description: string;
    videoUrl: string;
}