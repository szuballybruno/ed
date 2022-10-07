import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { FlexFloat } from '../../controls/FlexFloat';

export const VerticalTile = (props: {
    title: string,
    subTitle: string,
    imageComponent: ReactNode,
    infoComponent: ReactNode,
    buttonsComponent: ReactNode

} & EpistoFlex2Props) => {

    const {
        title,
        subTitle,
        imageComponent,
        infoComponent,
        buttonsComponent,
        ...css
    } = props;

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
        position="relative"
        overflow="hidden"
        shadow="0 0 10px 1px #CCC"
        background="var(--transparentWhite70)"
        justifyContent="space-between"
        p="5px"
        {...css}>

        {imageComponent}

        <EpistoFlex2
            p="10px 10px 0 10px"
            direction={'column'}
            flex="1">

            <EpistoFlex2 direction="column"
                flex="5">

                {/* category  */}
                <EpistoFont
                    style={{
                        fontSize: '13px',
                        color: 'gray'
                    }}>
                    {subTitle}
                </EpistoFont>

                {/* title */}
                <EpistoFlex2 direction="column">

                    <EpistoFont
                        fontWeight={'heavy'}
                        fontSize="fontMid">

                        {title}
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>

        <EpistoFlex2
            direction='column'
            p='0 10px 10px 10px'>

            {infoComponent}
        </EpistoFlex2>

        {buttonsComponent}

    </FlexFloat>;
};