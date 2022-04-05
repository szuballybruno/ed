import { Divider, Flex } from '@chakra-ui/react';
import { Add, Delete, Edit } from '@mui/icons-material';
import { iterate } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';
import { FlexListItem } from '../../universal/FlexListItem';

export const ModuleEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic: dialogLogic } = props;

    // ".MuiDialog-paper": {
    //     background: "rgba(255,255,255,0.7)",
    //     backdropFilter: "blur(12px)",
    //     borderRadius: "7px",
    //     boxShadow: "0px 0px 30px 50px rgba(0,0,0,0.2)"
    // },
    // ".MuiBackdrop-root": {
    //     background: "transparent"
    // }


    return <EpistoDialog
        logic={dialogLogic}
        fullScreenX
        fullScreenY>

        <Flex
            className="roundBorders"
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
                className="mildShadow"
                zIndex="1000"
                flex="1">

                <Flex
                    direction="column">

                    <Flex align="center">

                        <EpistoFont
                            fontSize={'fontLarge'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                fontWeight: 600,
                                marginRight: '15px'
                            }}>

                            Modulok szerkesztése
                        </EpistoFont>
                    </Flex>

                    <EpistoFont
                        fontSize={'fontMid'}>

                        Microsoft PowerPoint alapok
                    </EpistoFont>
                </Flex>

                <EpistoButton
                    icon={<Add />}>

                    Hozzáadás
                </EpistoButton>
            </Flex>

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

                    {iterate(4, () => <Flex
                        flex="1"
                        direction="column">

                        <FlexListItem
                            h="50px"
                            className='dividerBorderBottom'
                            thumbnailContent={'Modul neve'}
                            endContent={<Flex>

                                <EpistoButton>
                                    <Edit />
                                </EpistoButton>

                                <EpistoButton>
                                    <Delete />
                                </EpistoButton>
                            </Flex>
                            } />
                    </Flex>)}
                </Flex >
            </Flex >
        </Flex>
    </EpistoDialog>;
};