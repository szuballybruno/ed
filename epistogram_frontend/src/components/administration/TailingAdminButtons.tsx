import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const TailingAdminButtons = (props: {
    onSaveCallback: () => void,
    onDeleteCallback: () => void
}) => {

    const { onDeleteCallback, onSaveCallback } = props;

    return (
        <EpistoFlex2
            id={TailingAdminButtons.name}
            justify="right"
            width="100%"
            direction='row'
            p="10px">

            {/* delete button */}
            <EpistoButton
                variant='outlined'
                onClick={onDeleteCallback}
                style={{
                    color: 'var(--deepRed)'
                }}>

                {translatableTexts.misc.remove}
            </EpistoButton>

            {/* save button */}
            <EpistoButton
                variant='colored'
                margin={{
                    left: 'px5'
                }}
                onClick={onSaveCallback}>

                {translatableTexts.misc.save}
            </EpistoButton>
        </EpistoFlex2>
    );
};