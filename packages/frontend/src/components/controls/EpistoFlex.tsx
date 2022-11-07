import { Flex, FlexProps } from '@chakra-ui/layout';
import React from 'react';
import { PropsWithChildren, useCSSOptionClasses } from '../../static/frontendHelpers';
import { CSSOptionsFlex } from '../../styles/globalCssTypes';
import classes from './css/EpistoFlex.module.css';

export const EpistoFlex: React.FC<CSSOptionsFlex & PropsWithChildren> = ({
    children,
    ...cssOptions
}) => {

    const { cssOptionClasses } = useCSSOptionClasses(cssOptions);

    return (
        <div
            className={classes.epistoFlexDefault + ' ' + cssOptionClasses}>

            {children}
        </div>
    );
};

export type EpistoFlex2Props = FlexProps;

export const EpistoFlex2 = React.forwardRef<HTMLDivElement, EpistoFlex2Props>((props, ref) => {

    return (
        <Flex
            {...props}
            ref={ref} />
    );
});