import { EpistoHeader } from '../EpistoHeader';
import { FlexFloat } from '../controls/FlexFloat';
import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

const MobileDashboardSection = (props: {
    title: string,
    variant?: 'noShadow' | 'normal',
    showDivider?: boolean,
    headerContent?: ReactNode
} & EpistoFlex2Props) => {

    const { title, children, variant, showDivider, headerContent, ...css } = props;

    return <EpistoFlex2
        width='100%'
        mt='20px'
        direction='column'>

        <EpistoHeader
            text={title}
            showDivider={showDivider}
            variant="strongSub"
            fontWeight='600'
            m="5px 10px 0 10px">

            {headerContent}
        </EpistoHeader>

        <FlexFloat
            p='0 10px'
            width='100%'
            {...css}>

            {children}
        </FlexFloat>
    </EpistoFlex2>;
};

export const DashboardSection = (props: EpistoFlex2Props & {
    title: string,
    variant?: 'noShadow' | 'normal',
    showDivider?: boolean,
    isMobile?: boolean,
    headerContent?: ReactNode
}) => {

    const { title, children, variant, showDivider, isMobile, headerContent, ...css } = props;

    return isMobile
        ? <MobileDashboardSection {...props} />
        : <FlexFloat
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
                m="5px 10px 0 10px">

                {headerContent}
            </EpistoHeader>

            {children}
        </FlexFloat>;
};
