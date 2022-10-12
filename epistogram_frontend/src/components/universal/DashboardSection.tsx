import { EpistoHeader } from '../EpistoHeader';
import { FlexFloat } from '../controls/FlexFloat';
import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const DashboardSection = ({
    title,
    children,
    variant,
    showDivider,
    headerContent,
    isMobile,
    ...css
}: EpistoFlex2Props & {
    title: string,
    variant?: 'noShadow' | 'normal',
    showDivider?: boolean,
    isMobile?: boolean,
    headerContent?: ReactNode
}) => {

    const titleId = title
        .replaceAll(' ', '_')
        .toLowerCase();

    if (isMobile)
        return (
            <EpistoFlex2
                width='100%'
                mt='20px'
                direction='column'>

                <EpistoHeader
                    text={title}
                    showDivider={isMobile ? false : showDivider}
                    variant="strongSub"
                    fontWeight='600'
                    type='strong'
                    m="5px 10px 0 10px">

                    {headerContent}
                </EpistoHeader>

                <FlexFloat
                    p='0 10px'
                    width='100%'
                    {...css}>

                    {children}
                </FlexFloat>
            </EpistoFlex2>
        );

    return (
        <FlexFloat
            id={`${DashboardSection.name}-${titleId}`}
            className="roundBorders"
            background="transparent"
            direction="column"
            p="10px"
            boxShadow={variant === 'noShadow' ? 'none' : undefined}
            {...css}>

            <EpistoHeader
                text={title}
                showDivider={showDivider}
                variant="strongSub"
                m="5px 10px 5px 10px">

                {headerContent}
            </EpistoHeader>

            <EpistoFlex2
                p='0 10px'>

                {children}
            </EpistoFlex2>
        </FlexFloat>
    );
};
