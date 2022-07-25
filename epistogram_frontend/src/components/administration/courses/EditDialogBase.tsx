import { Flex } from '@chakra-ui/react';
import { ArrowBack } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import { PagingType } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { EpistoDialog, } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { ChipSmall } from './ChipSmall';

export type EditDialogSubpage = {
    isFocused?: boolean,
    title: string,
    content: (isCurrent: boolean) => JSX.Element
};

export const EditDialogBase = <TParams,>(props: {
    title?: string,
    subTitle?: string,
    chipText?: string,
    chipColor?: string,
    hideTabs?: boolean,
    headerButtons?: ReactNode,
    logic: EpistoDialogLogicType<TParams>,
    paging: PagingType<EditDialogSubpage>,
    footer?: ReactNode
}) => {

    const {
        title,
        subTitle,
        chipText,
        chipColor,
        logic: dialogLogic,
        headerButtons,
        hideTabs,
        paging,
        footer
    } = props;

    const focusedTab = !!paging.currentItem?.isFocused;
    const subpages = paging.items;

    return <EpistoDialog
        closeButtonType="top"
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

                {/* unfocused header display */}
                {!focusedTab && <Flex
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
                            {title}
                        </EpistoFont>

                        {chipText && <ChipSmall
                            text={chipText}
                            color={chipColor} />}
                    </Flex>

                    <EpistoFont
                        fontSize={'fontMid'}>

                        {subTitle}
                    </EpistoFont>
                </Flex>}

                {/* focused header display */}
                {focusedTab && <>

                    {/* back button */}
                    <EpistoButton
                        icon={<ArrowBack />}
                        style={{

                        }}
                        onClick={() => paging.previous()}>

                        Vissza
                    </EpistoButton>

                    {/* header */}
                    <Flex
                        align='center'
                        justify='center'
                        className='whall'>

                        <EpistoFont
                            fontSize={'fontLarge'}
                            style={{
                                fontWeight: 'bold'
                            }}>

                            {paging.currentItem?.title}
                        </EpistoFont>
                    </Flex>
                </>}

                <Flex paddingRight='20px'>

                    {/* tab selector */}
                    {!hideTabs && <SegmentedButton
                        paging={paging}
                        getDisplayValue={x => x.title} />}

                    {!focusedTab && headerButtons}
                </Flex>
            </Flex>

            {/* tab renderer */}
            <EpistoPaging
                index={paging.currentIndex}
                slides={subpages.map(x => x.content)} />

            {/* footer */}
            {footer}
        </Flex>

    </EpistoDialog>;
};