import { useEffect, useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useDailyTipEditData, useSaveDailyTip } from "../../../services/api/dailyTipApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { useBoolParam, useIntParam } from "../../../static/frontendHelpers";
import { EpistoCheckbox } from "../../controls/EpistoCheckbox";
import { EpistoEntryNew, useEpistoEntryState } from "../../controls/EpistoEntryNew";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { LoadingFrame } from "../../system/LoadingFrame";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const EditDailyTipSubpage = () => {

    //util
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const traitCategoryId = useIntParam("traitCategoryId");
    const isMax = useBoolParam("isMax");
    const dailyTipId = useIntParam("dailyTipId")!;

    // http 
    const { dailyTipEditData, dailyTipEditState, dailyTipEditError } = useDailyTipEditData(dailyTipId);
    const { saveDailyTipAsync, saveDailyTipState } = useSaveDailyTip();

    // state
    const descriptionState = useEpistoEntryState();
    const [isLive, setIsLive] = useState(false);

    // func
    const handleSaveAsync = async () => {

        if (!descriptionState.validate())
            return;

        try {
            await saveDailyTipAsync({
                description: descriptionState.value,
                isLive,
                id: dailyTipEditData!.id
            });
            showNotification("Tipp sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    // effect 
    useEffect(() => {

        if (!dailyTipEditData)
            return;

        descriptionState.setValue(dailyTipEditData.description);
        setIsLive(dailyTipEditData.isLive);
    }, [dailyTipEditData]);

    return (
        <LoadingFrame
            loadingState={[dailyTipEditState, saveDailyTipState]}
            error={dailyTipEditError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips,
                    applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips.editTip
                ]}
                subRouteLabel={"Tipp " + dailyTipEditData?.id}
                onSave={handleSaveAsync}
                navigationQueryParams={{ traitCategoryId, isMax }}>

                <EpistoLabel text="Leiras">
                    <EpistoEntryNew
                        state={descriptionState}
                        isMultiline />
                </EpistoLabel>

                <EpistoLabel text="Aktiv">
                    <EpistoCheckbox
                        value={isLive}
                        setValue={setIsLive} />
                </EpistoLabel>

            </AdminSubpageHeader>
        </LoadingFrame>
    );
}