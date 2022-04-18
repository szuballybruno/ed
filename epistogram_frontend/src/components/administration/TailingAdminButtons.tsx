import { Flex } from '@chakra-ui/layout';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';

export const TailingAdminButtons = (props: {
    onSaveCallback: () => void,
    onDeleteCallback: () => void
}) => {

    const { onDeleteCallback, onSaveCallback } = props;

    return (
        <Flex direction='column'>

            {/* save button */}
            <EpistoButton
                variant='colored'
                onClick={onSaveCallback}
                style={{ margin: '20px 20px 0 20px' }}>

                {translatableTexts.misc.save}
            </EpistoButton>

            {/* delete button */}
            <EpistoButton
                variant='outlined'
                onClick={onDeleteCallback}
                style={{
                    margin: '20px 20px 0 20px',
                    color: 'var(--deepRed)'
                }}>

                {translatableTexts.misc.remove}
            </EpistoButton>
        </Flex>
    );
};