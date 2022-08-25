import { HiddenFileUploadInput } from '../HiddenFileUploadInput';
import { FileSelectorLogicType } from './FileSelectorLogic';

export const FileSelector = ({ logic }: { logic: FileSelectorLogicType }) => {

    return (
        <HiddenFileUploadInput
            ref={logic._fileBrowseInputRef}
            onFileSelected={logic._onFileSelected}
            type={logic.type} />
    );
};