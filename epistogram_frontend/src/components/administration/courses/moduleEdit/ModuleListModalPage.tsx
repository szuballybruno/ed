import { Flex } from '@chakra-ui/react';
import { Delete, Edit } from '@mui/icons-material';
import { LoadingStateType } from '../../../../models/types';
import { useDeleteModule } from '../../../../services/api/moduleApiService';
import { showNotification } from '../../../../services/core/notifications';
import { ModuleListEditDataDTO } from '../../../../shared/dtos/ModuleListEditDataDTO';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFont } from '../../../controls/EpistoFont';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { FlexListItem } from '../../../universal/FlexListItem';

export const ModuleListModalPage = (props: {
    moduleListEditData: ModuleListEditDataDTO | null,
    moduleListEditDataState: LoadingStateType,
    moduleListEditDataError: any,
    refetchModuleList: () => Promise<void>,
    handleEditModule: (moduleId: number) => any,
    afterChangeCallback: () => void
}) => {

    const {
        moduleListEditData,
        moduleListEditDataState,
        moduleListEditDataError,
        handleEditModule,
        refetchModuleList,
        afterChangeCallback
    } = props;

    const {
        deleteModuleAsync,
        deleteModuleState
    } = useDeleteModule();

    const handleDeleteModule = async (moduleId: number) => {

        await deleteModuleAsync(moduleId);
        await refetchModuleList();
        afterChangeCallback();
        
        showNotification('Modul sikeresen torolve.');
    };

    const modules = moduleListEditData?.modules ?? [];

    return <LoadingFrame
        loadingState={[moduleListEditDataState, deleteModuleState]}
        error={moduleListEditDataError}
        className="roundBorders"
        flex="1"
        flexDirection="column">

        <Flex
            flex="1"
            p="20px">

            <Flex
                flex="1"
                direction="column"
                className="roundBorders largeSoftShadow"
                background="var(--transparentWhite90)"
                padding="0 20px">

                <FlexListItem
                    h="50px"
                    thumbnailContent={<EpistoFont
                        style={{
                            fontWeight: 600
                        }}>

                        Modulok
                    </EpistoFont>} />

                <Flex direction='column'>
                    {modules
                        .map((module) => <Flex
                            key={module.id}
                            flex="1"
                            direction="column">

                            <FlexListItem
                                h="50px"
                                className='dividerBorderBottom'
                                thumbnailContent={module.name}
                                endContent={<Flex>

                                    <EpistoButton
                                        onClick={() => handleEditModule(module.id)}>

                                        <Edit />
                                    </EpistoButton>

                                    <EpistoButton
                                        onClick={() => handleDeleteModule(module.id)}
                                        isDisabled={!module.canDelete}>

                                        <Delete />
                                    </EpistoButton>
                                </Flex>
                                } />
                        </Flex>)}
                </Flex>
            </Flex >
        </Flex >
    </LoadingFrame>;
};