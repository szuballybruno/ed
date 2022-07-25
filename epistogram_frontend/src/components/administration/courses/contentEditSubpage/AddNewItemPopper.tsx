import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoPopper } from '../../../controls/EpistoPopper';

export const AddNewItemPopper = (props: {
    isOpen: boolean,
    targetElement: any,
    onClose: () => void,
    onAddItem: (type: 'video' | 'exam') => void
}) => {

    const { isOpen, targetElement, onClose, onAddItem } = props;

    return (
        <EpistoPopper
            isOpen={isOpen}
            target={targetElement}
            placementX="left"
            style={{
                width: 200,
                alignItems: 'flex-start'
            }}
            handleClose={onClose}>

            <EpistoButton>
                Modul
            </EpistoButton>

            <EpistoButton onClick={() => onAddItem('video')}>
                Videó
            </EpistoButton>

            <EpistoButton onClick={() => onAddItem('exam')}>
                Vizsga
            </EpistoButton>

        </EpistoPopper>
    );
};