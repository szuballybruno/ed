import { useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useDailyTipEditData, useSaveDailyTip } from '../../../services/api/dailyTipApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { Id } from '../../../shared/types/versionId';
import { useBoolParam, useIntParam } from '../../../static/locationHelpers';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoEntryNew, useEpistoEntryState } from '../../controls/EpistoEntryNew';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const EditDailyTipSubpage = () => {

    //util
    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();
    const traitCategoryId = Id
        .create<'PersonalityTraitCategory'>(useIntParam('traitCategoryId')!);
    const isMax = useBoolParam('isMax');
    const dailyTipId = Id
        .create<'DailyTip'>(useIntParam('dailyTipId')!);

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
            showNotification('Tipp sikeresen mentve!');
        }
        catch (e) {

            showError(e);
        }
    };

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
                direction="column"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.personalityAssessmentRoute.editTipsRoute,
                    applicationRoutes.administrationRoute.personalityAssessmentRoute.editTipsRoute.editTipRoute
                ]}
                subRouteLabel={'Tipp ' + dailyTipEditData?.id}
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
};