import { Id, TempomatModeType } from '@episto/commontypes';
import { useSetTempomatMode } from '../../../services/api/tempomatApiService';
import { useCourseProgressOverview } from '../../../services/api/userProgressApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { coalesce, Formatters } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoDivider } from '../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { TempomatModeTile } from './TempomatModeTile';

export const TempomatSettingsDialog = (props: {
    tempomatDialogLogic: EpistoDialogLogicType,
    courseId: Id<'Course'>,
    onTempomatModeChanged: () => Promise<void>,
    tempomatMode: TempomatModeType
}) => {

    const { tempomatDialogLogic, tempomatMode, courseId, onTempomatModeChanged } = props;

    const showError = useShowErrorDialog();

    const { courseProgressOverviewData } = useCourseProgressOverview(courseId);

    const {
        estimatedCompletionDate
    } = coalesce(courseProgressOverviewData, {
        estimatedCompletionDate: new Date()
    });

    const { setTempomatMode } = useSetTempomatMode();

    const handleSetTempomatMode = async (mode: TempomatModeType) => {

        try {

            await setTempomatMode({ mode, courseId });
            await onTempomatModeChanged();
        }
        catch (e) {

            showError(e);
        }
    };

    return (
        <EpistoDialog
            fullScreenX
            title='A tanfolyam tempójának beállítása'
            closeButtonType='top'
            logic={tempomatDialogLogic} >

            <EpistoFlex2 direction="column"
                align="center"
                flex="1" >

                <EpistoDivider
                    height="1px"
                    width="calc(100% - 20px)"
                    background="grey" />

                <EpistoFlex2
                    justify="space-between"
                    padding="5px">

                    <TempomatModeTile
                        tempomatMode="light"
                        title="Megengedő üzemmód"
                        isSelected={tempomatMode === 'light'}
                        description={translatableTexts.tempomat.lightModeDescription}
                        onClick={() => handleSetTempomatMode('light')} />

                    <TempomatModeTile
                        tempomatMode="strict"
                        title="Szigorú üzemmód"
                        isSelected={tempomatMode === 'strict'}
                        description={translatableTexts.tempomat.strictModeDescription}
                        onClick={() => handleSetTempomatMode('strict')} />
                </EpistoFlex2>

                <EpistoDivider
                    height="1px"
                    width="calc(100% - 20px)"
                    background="grey" />

                <EpistoFlex2
                    height="150px"
                    align="center"
                    justify="center"
                    my="20px"
                    flex="1">

                    <EpistoFlex2
                        mx="10px"
                        align="center">

                        <EpistoFont>
                            Jelenlegi várható befejezés:
                        </EpistoFont>

                        <EpistoFont
                            style={{
                                margin: '0 0 0 10px',
                                fontWeight: 600
                            }}>

                            {Formatters.formatDate(estimatedCompletionDate)}
                        </EpistoFont>
                    </EpistoFlex2>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoDialog >
    );
};