import { Flex } from '@chakra-ui/react';
import React from 'react';
import { usePaging } from '../../../static/frontendHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { ChipSmall } from './ChipSmall';

export const CourseItemEditDialogBase = (props: {
    subpages: ({
        title: string,
        content: (isCurrent: boolean) => JSX.Element
    })[],
    logic: EpistoDialogLogicType
}) => {

    const { logic: dialogLogic, subpages } = props;

    const paging = usePaging(subpages);

    const setTab = (index: number) => {

        paging.setItem(index);
    };

    return <EpistoDialog
        logic={dialogLogic}
        fullScreenX
        fullScreenY>

        <Flex
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* header */}
            <Flex
                background="rgba(255,255,255,0.97)"
                direction="row"
                align='center'
                justify="space-between"
                position="sticky"
                w="100%"
                top="0"
                p="0px 30px 0px 30px"
                maxH='70px'
                minH='70px'
                className="mildShadow"
                zIndex="1000"
                flex="1">

                <Flex
                    direction="column"
                    justify='center'>

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
                            Új dia hozzáadása
                        </EpistoFont>

                        <ChipSmall
                            text="Videó"
                            color="var(--deepBlue)" />
                    </Flex>

                    <EpistoFont
                        fontSize={'fontMid'}>

                        Microsoft PowerPoint alapok
                    </EpistoFont>
                </Flex>

                {/* tab selector */}
                <SegmentedButton
                    paging={paging}
                    getDisplayValue={x => x.title} />

            </Flex>

            {/* tab renderer */}
            <EpistoPaging
                index={paging.currentIndex}
                slides={subpages.map(x => x.content)} />
        </Flex>

    </EpistoDialog>;
};