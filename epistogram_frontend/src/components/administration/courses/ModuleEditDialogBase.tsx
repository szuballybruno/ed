import { Flex } from '@chakra-ui/react';
import { Add, ArrowBack } from '@mui/icons-material';
import React from 'react';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';
import { EpistoPaging } from '../../universal/EpistoPaging';

export const ModuleEditDialogBase = (props: {
    /* subpages: ({
        title: string,
        content: (isCurrent: boolean) => JSX.Element
    })[], */
    handleBackToModuleList: () => void,
    handleAddModuleAsync: () => void,
    currentItemIndex: number,
    subpages: ((isCurrent: boolean) => JSX.Element)[],
    logic: EpistoDialogLogicType,
    courseName: string,
    moduleName?: string
}) => {

    const { handleBackToModuleList, handleAddModuleAsync, logic: dialogLogic, courseName, moduleName, currentItemIndex, subpages } = props;

    const isModuleEditInProgress = currentItemIndex !== 0;

    return <EpistoDialog
        logic={dialogLogic}
        fullScreenX
        fullScreenY>

        <Flex
            overflowY="scroll"
            className="roundBorders whall"
            flex="1"
            flexDirection="column">

            {/* header */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                justify="space-between"
                position="sticky"
                w="100%"
                top="0"
                p="20px 30px 20px 30px"
                maxH="70px"
                className="mildShadow"
                zIndex="1000"
                flex="1">

                {isModuleEditInProgress && <Flex
                    flex='1'>

                    <EpistoButton
                        icon={<ArrowBack />}
                        style={{

                        }}
                        onClick={() => handleBackToModuleList()}>

                        Vissza
                    </EpistoButton>
                </Flex>}

                <Flex align="center">

                    <Flex
                        ml="10px"
                        direction="column">

                        <Flex align="center">

                            <EpistoFont
                                fontSize={isModuleEditInProgress
                                    ? 'fontLargePlus'
                                    : 'fontLarge'}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    fontWeight: 600,
                                    marginRight: '15px'
                                }}>

                                {isModuleEditInProgress ? moduleName : 'Modulok szerkesztése'}
                            </EpistoFont>
                        </Flex>

                        {!isModuleEditInProgress && <EpistoFont
                            fontSize={'fontMid'}>

                            {courseName}
                        </EpistoFont>}
                    </Flex>
                </Flex>


                {!isModuleEditInProgress
                    ? <EpistoButton
                        onClick={() => handleAddModuleAsync()}
                        icon={<Add />}>

                        Hozzáadás
                    </EpistoButton>
                    : <Flex flex="1">
                    </Flex>}
            </Flex>

            {/* tab renderer */}
            <EpistoPaging
                index={currentItemIndex}
                slides={subpages} />
        </Flex>

    </EpistoDialog >;
};