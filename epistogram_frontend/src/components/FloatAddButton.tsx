import { Box } from '@chakra-ui/layout';
import { Add } from '@mui/icons-material';
import { EpistoButton } from './controls/EpistoButton';

export const FloatAddButton = (props: { onClick: () => void }) => <Box position="absolute"
bottom="45"
right="45">
    <EpistoButton
        variant="colored"
        size="60px"
        padding="0px"
        isRound
        onClick={props.onClick}>
        <Add />
    </EpistoButton>
</Box>;