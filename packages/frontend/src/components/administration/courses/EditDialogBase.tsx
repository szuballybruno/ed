import { ArrowBack } from '@mui/icons-material';
import { ReactNode } from 'react';
import { PagingType } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { ChipSmall } from './ChipSmall';

export type EditDialogSubpage = {
    isFocused?: boolean,
    title: string,
    content: (isCurrent: boolean) => JSX.Element
};

const EditDialogBase = <TParams,>({
    title,
    subTitle,
    chipText,
    chipColor,
    logic: dialogLogic,
    headerButtons,
    hideTabs,
    paging,
    footer
}: {
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

    const focusedTab = !!paging.currentItem?.isFocused;
    const subpages = paging.items;

    return <EpistoDialog
        closeButtonType="top"
        logic={dialogLogic}
        fullScreenX
        fullScreenY>

        <EpistoFlex2
            overflowY="scroll"
            className="roundBorders"
            flex="1"
            flexDirection="column">

            {/* header */}
            <EpistoFlex2
                background="rgba(255,255,255,0.97)"
                direction="row"
                align='center'
                justify="space-between"
                position="sticky"
                width="100%"
                top="0"
                padding="0px 30px 0px 30px"
                maxH='70px'
                minH='70px'
                className="mildShadow"
                zIndex="1000"
                flex="1">

                {/* unfocused header display */}
                {!focusedTab && <EpistoFlex2
                    direction="column"
                    justify='center'>

                    <EpistoFlex2 align="center">

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
                    </EpistoFlex2>

                    <EpistoFont
                        fontSize={'fontLarge'}>

                        {subTitle}
                    </EpistoFont>
                </EpistoFlex2>}

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
                    <EpistoFlex2
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
                    </EpistoFlex2>
                </>}

                <EpistoFlex2 paddingRight='20px'>

                    {/* tab selector */}
                    {!hideTabs && <SegmentedButton
                        variant="default"
                        paging={paging}
                        getDisplayValue={x => x.title} />}

                    {!focusedTab && headerButtons}
                </EpistoFlex2>
            </EpistoFlex2>

            {/* tab renderer */}
            <EpistoPaging
                index={paging.currentIndex}
                slides={subpages.map(x => x.content)} />

            {/* footer */}
            {footer}
        </EpistoFlex2>

    </EpistoDialog>;
};
