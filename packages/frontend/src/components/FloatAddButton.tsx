import { Add } from '@mui/icons-material';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoDiv } from './controls/EpistoDiv';

export const FloatAddButton = (props: { onClick: () => void }) => <EpistoDiv position="absolute"
    bottom="45"
    right="45">
    <EpistoButton
        variant="action"
        size="60px"
        padding="0px"
        isRound
        onClick={props.onClick}>
        <Add />
    </EpistoButton>
</EpistoDiv>;