import { Grid, GridProps } from '@chakra-ui/layout';
import { ReactNode } from 'react';

export const EpistoGrid = (props: {
    children: ReactNode,
    minColumnWidth: string,
    gap: string,
    auto: 'fit' | 'fill'
} & GridProps) => {

    const { minColumnWidth, gap, children, auto, ...css } = props;

    return <Grid
        templateColumns={`repeat(auto-${auto}, minmax(${minColumnWidth}, 1fr))`}
        gap={gap}
        {...css}>
        {children}
    </Grid>;
};