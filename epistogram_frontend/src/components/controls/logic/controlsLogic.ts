import { EpistoEntryStateType } from "../EpistoEntryNew";

export const validateAllEntries = (entryStates: EpistoEntryStateType[]) => {

    const isValid = !entryStates
        .map(x => x.validate())
        .some(x => !x);

    return isValid;
};