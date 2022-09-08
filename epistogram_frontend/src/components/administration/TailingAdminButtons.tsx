import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const TailingAdminButtons = (props: {
    onSaveCallback: () => void,
    onDeleteCallback: () => void
}) => {

    const { onDeleteCallback, onSaveCallback } = props;

    return (
        <EpistoFlex2 direction='column'>

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
        </EpistoFlex2>
    );
};