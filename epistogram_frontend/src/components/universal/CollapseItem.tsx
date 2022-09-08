import {Box} from '@chakra-ui/layout';
import {CSSProperties, ReactNode} from 'react';
import {EpistoButton} from '../controls/EpistoButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const CollapseItem = (props: {
    isOpen: boolean,
    header: (defaultExpandCollapseButton: ReactNode) => ReactNode,
    children: ReactNode,
    style?: CSSProperties,
    handleToggle?: (targetIsOpenState: boolean) => void
}) => {

    const { header, children, style, isOpen, handleToggle } = props;

    const defaultExpandCollapseButton = handleToggle
        ? <EpistoButton
            onClick={() => handleToggle(!isOpen)}>

            {isOpen
                ? <ExpandMoreIcon />
                : <ChevronRightIcon />}
        </EpistoButton>
        : null;

    return <EpistoFlex2
        id="collapseItemRoot"
        direction="column"
        justifyContent={'flex-start'}
        style={style}>

        {header(defaultExpandCollapseButton)}

        <Box
            transition="0.3s"
            pl="20px"
        >

            {isOpen ? children : null}
        </Box>
    </EpistoFlex2>;
};
