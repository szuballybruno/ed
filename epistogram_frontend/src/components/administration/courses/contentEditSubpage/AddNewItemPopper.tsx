import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoPopper } from '../../../controls/EpistoPopper';

export const AddNewItemPopper = ({
    isOpen,
    targetElement,
    hasModules,
    onClose,
    onAddItem
}: {
    isOpen: boolean,
    targetElement: any,
    hasModules: boolean,
    onClose: () => void,
    onAddItem: (type: 'video' | 'exam') => void
}) => {

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

            <EpistoButton
                tooltip={hasModules ? 'Add video' : 'No modules to add to, add a module first!'}
                isDisabled={!hasModules}
                onClick={() => onAddItem('video')}>
                Videó
            </EpistoButton>

            <EpistoButton
                tooltip={hasModules ? 'Add exam' : 'No modules to add to, add a module first!'}
                isDisabled={!hasModules}
                onClick={() => onAddItem('exam')}>
                Vizsga
            </EpistoButton>

        </EpistoPopper>
    );
};