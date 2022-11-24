import { EpistoIcons } from '../../../../static/EpistoIcons';
import { PagingType } from '../../../../static/frontendHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { SegmentedButton } from '../../../controls/SegmentedButton';
import { EpistoPaging } from '../../../universal/EpistoPaging';
import { ChipSmall } from '../ChipSmall';
import { EditDialogSubpage } from '../EditDialogBase';

export const DetailsLayout = ({
    chipText,
    chipColor,
    title,
    subTitle,
    paging,
    cancelEdit,
    okEdit
}: {
    chipText: string,
    chipColor: string,
    title: string,
    subTitle: string,
    paging: PagingType<EditDialogSubpage>,
    cancelEdit: () => void,
    okEdit: () => void
}) => {

    const subpages = paging.items;

    return (
        <>
            <EpistoFlex2
                overflowY="scroll"
                className="roundBorders"
                flex="1"
                flexDirection="column">

                {/* header */}
                <EpistoFlex2
                    background="rgba(255,255,255,0.97)"
                    align='center'
                    justify="space-between"
                    padding="0px 30px 0px 30px"
                    paddingBottom="5px"
                    className="mildShadow">

                    {/* header left */}
                    <EpistoFlex2
                        direction="column">

                        <EpistoFlex2
                            align="center">

                            {chipText && <ChipSmall
                                text={chipText}
                                color={chipColor} />}

                            <EpistoFont
                                style={{
                                    marginLeft: '10px',
                                    fontWeight: 600
                                }}>
                                {title}
                            </EpistoFont>
                        </EpistoFlex2>

                        <EpistoFont>

                            {subTitle}
                        </EpistoFont>
                    </EpistoFlex2>

                    {/* spacer */}
                    <EpistoFlex2
                        flex="1" />

                    {/* tabs */}
                    <EpistoFlex2 paddingRight='20px'>

                        {/* tab selector */}
                        <SegmentedButton
                            variant="default"
                            paging={paging}
                            getDisplayValue={x => x.title} />
                    </EpistoFlex2>

                    {/* save button */}
                    <EpistoButton
                        variant="colored"
                        onClick={okEdit}>
                        {translatableTexts.misc.ok}
                    </EpistoButton>

                    {/* close button */}
                    <EpistoButton
                        onClick={cancelEdit}>
                        <EpistoIcons.Close />
                    </EpistoButton>
                </EpistoFlex2>

                {/* tab renderer */}
                <EpistoPaging
                    index={paging.currentIndex}
                    slides={subpages.map(x => x.content)} />
            </EpistoFlex2>
        </>
    );
};