import { FlexProps } from '@chakra-ui/layout';
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

export const EpistoFlex2: React.FC<FlexProps & { ref?: any }> = (props) => {

    // const { cssOptionClasses } = useCSSOptionClasses(cssOptions);

    return (
        <EpistoFlex2 {...props} />
    );
};