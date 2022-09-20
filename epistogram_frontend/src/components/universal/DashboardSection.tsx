import { EpistoHeader } from '../EpistoHeader';
import { FlexFloat } from '../controls/FlexFloat';
import { ReactNode } from 'react';
import { EpistoFlex2Props } from '../controls/EpistoFlex';

export const DashboardSection = ({
    title,
    children,
    variant,
    showDivider,
    headerContent,
    ...css
}: EpistoFlex2Props & {
    title: string,
    variant?: 'noShadow' | 'normal',
    showDivider?: boolean,
    headerContent?: ReactNode
}) => {

    const titleId = title
        .replaceAll(' ', '_')
        .toLowerCase();

    return <FlexFloat
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
            m="5px 10px 0 10px">

            {headerContent}
        </EpistoHeader>

        {children}
    </FlexFloat>;
};
