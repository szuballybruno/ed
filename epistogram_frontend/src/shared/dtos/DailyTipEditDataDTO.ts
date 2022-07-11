import { DailyTip } from "../../models/entity/DailyTip";
import { Id } from "../types/versionId";

export class DailyTipEditDataDTO {
    id: Id<DailyTip>;
    description: string;
    isLive: boolean;
}