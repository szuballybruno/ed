import { Box, FlexProps } from '@chakra-ui/react';
import { EpistoHeader } from '../EpistoHeader';
import { FlexFloat } from '../controls/FlexFloat';

export const DashboardSection = (props: FlexProps & { title: string, variant?: 'noShadow' | 'normal', showDivider?: boolean }) => {

    const { title, children, variant, showDivider, ...css } = props;

    return <FlexFloat
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
            m="5px 10px 0 10px" />

        {children}
    </FlexFloat>;
};