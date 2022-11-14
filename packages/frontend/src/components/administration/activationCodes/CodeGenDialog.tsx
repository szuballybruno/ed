import { parseIntOrFail } from '@episto/commonlogic';
import { useEffect, useState } from 'react';
import { showNotification } from '../../../services/core/notifications';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { CompanySelectorDropdown, CompanySelectorLogicType } from '../users/CompanySelectorDropdown';

export const useCodeGenDialogLogic = (companySelector: CompanySelectorLogicType, refreshList: () => void) => {

    const [prefix, setPrefix] = useState('');
    const [count, setCount] = useState('10');
    const [isLatest, setIsLatest] = useState(false);
    const { miscApiService } = useServiceContainerContext();

    const { generateActivationCodesAsync } = miscApiService
        .useGenerateActivationCodes();

    const { generateActivationCodesPreviewAsync, activationCodesPreviewList } = miscApiService
        .useGenerateActivationCodesPreview();

    const isPreviewGenerated = activationCodesPreviewList.length > 0;

    /**
     * Set is latest true if activation codes list changed, and it has values 
     */
    useEffect(() => {

        const isPreviewGenerated = activationCodesPreviewList.length > 0;
        setIsLatest(isPreviewGenerated);
    }, [activationCodesPreviewList]);

    /**
     * Set is latest to false if count or prefix is changed
     */
    useEffect(() => {

        setIsLatest(false);
    }, [prefix, count]);

    const handleGenerateActivationCodesPreviewAsync = async () => {

        await generateActivationCodesPreviewAsync({
            companyId: companySelector.activeCompanyId,
            count: parseIntOrFail(count),
            prefix
        });
    };

    const handleGenerateActivationCodesAsync = async () => {

        await generateActivationCodesAsync({
            companyId: companySelector.activeCompanyId,
            count: parseIntOrFail(count),
            prefix
        });

        showNotification(`Generated ${count} activation codes for company '${companySelector.activeCompany?.name}'`);
        refreshList();
    };

    return {
        dialogLogic: useEpistoDialogLogic(useCodeGenDialogLogic.name),
        compoanySelector: companySelector,
        prefix,
        setPrefix,
        activationCodesPreviewList,
        isLatest,
        setCount,
        isPreviewGenerated,
        count,
        handleGenerateActivationCodesAsync,
        handleGenerateActivationCodesPreviewAsync
    };
};

export type CodeGenDialogLogicType = ReturnType<typeof useCodeGenDialogLogic>;

export const CodeGenDialog = ({
    logic: {
        compoanySelector,
        dialogLogic,
        prefix,
        setPrefix,
        count,
        setCount,
        activationCodesPreviewList,
        isLatest: isPreviewingLatest,
        isPreviewGenerated,
        handleGenerateActivationCodesAsync,
        handleGenerateActivationCodesPreviewAsync
    }
}: { logic: CodeGenDialogLogicType }) => {

    return (
        <EpistoDialog
            closeButtonType="top"
            title="Activation code generator"
            logic={dialogLogic}>

            <EpistoFlex2
                bg="white"
                width="50vw"
                direction="column"
                padding="30px">

                <EpistoLabel
                    text="Company">

                    <CompanySelectorDropdown
                        logic={compoanySelector} />
                </EpistoLabel>

                <EpistoLabel
                    text="Prefix">

                    <EpistoEntry
                        value={prefix}
                        setValue={setPrefix} />
                </EpistoLabel>

                <EpistoLabel
                    text="Count">

                    <EpistoEntry
                        value={count}
                        setValue={setCount} />
                </EpistoLabel>

                <EpistoFlex2
                    mt="20px"
                    justify="center">

                    <EpistoButton
                        variant="colored"
                        isDisabled={isPreviewingLatest}
                        onClick={handleGenerateActivationCodesPreviewAsync}>

                        Generate preview
                    </EpistoButton>

                    <EpistoButton
                        variant="colored"
                        isDisabled={!isPreviewingLatest}
                        onClick={handleGenerateActivationCodesAsync}>

                        Generate codes
                    </EpistoButton>
                </EpistoFlex2>

                {isPreviewGenerated && <EpistoLabel
                    overflowY="scroll"
                    maxHeight="30vh"
                    text="Preview">

                    <EpistoFont
                        isMultiline>

                        {activationCodesPreviewList.join('\n')}
                    </EpistoFont>
                </EpistoLabel>}

            </EpistoFlex2>
        </EpistoDialog>
    );
};