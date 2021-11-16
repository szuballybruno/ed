import { Box, Flex } from "@chakra-ui/layout"
import { CSSProperties, ReactNode } from "react"
import { EpistoButton } from "./EpistoButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    return <Flex id="collapseItemRoot" direction="column" style={style}>

        {header(defaultExpandCollapseButton)}

        <Box
            transition="0.3s"
            overflow="hidden"
            maxHeight={isOpen ? "999px" : "0px"}
            pl="20px">

            {children}
        </Box>
    </Flex>
}