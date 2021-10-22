import { DailyTipOccurrence } from "../models/entity/DailyTipOccurrence";
import { JobTitle } from "../models/entity/JobTitle";
import { DailyTipView } from "../models/views/DailyTipView";
import { toDailyTipDTO } from "../services/mappings";
import { staticProvider } from "../staticProvider";
import { ActionParamsType } from "../utilities/helpers";

export const getJobTitlesAction = async (params: ActionParamsType) => {

    return await staticProvider
        .ormConnection
        .getRepository(JobTitle)
        .find();
};

export const getDailyTipAction = async (params: ActionParamsType) => {

    const dailyTipViews = await staticProvider
        .ormConnection
        .getRepository(DailyTipView)
        .find();

    // filter for todays tip,
    // if it's found, there is no need to do anything else, just return it
    const todaysTip = dailyTipViews.firstOrNull(x => x.isCurrentTip);
    if (todaysTip)
        return toDailyTipDTO(todaysTip);

    // first is used here since the tips are in order of relevance
    const newCurrentTip = dailyTipViews.first(x => true);

    // insert new occurrence, this sets it as current in the DB as well
    await staticProvider
        .ormConnection
        .getRepository(DailyTipOccurrence)
        .insert({
            dailyTipId: newCurrentTip.dailyTipId
        });

    return toDailyTipDTO(newCurrentTip);
};