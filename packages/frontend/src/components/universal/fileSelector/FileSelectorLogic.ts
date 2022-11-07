import { useRef, useState } from 'react';

export type SelectedFileDataType = {
    file: File;
    src: string;
};

type SelectorType = 'video' | 'image';

export const useFileSelectorLogic = ({
    onFileSelected,
    type
}: {
    onFileSelected: (data: SelectedFileDataType) => void,
    type: SelectorType
}) => {

    const [selectedFileData, setSelectedFileData] = useState<SelectedFileDataType | null>(null);
    const fileBrowseInputRef = useRef<HTMLInputElement>(null);

    const _onFileSelected = (file: File, src: string) => {

        const data: SelectedFileDataType = { file, src };

        setSelectedFileData(data);
        onFileSelected(data);
    };

    const selectFile = () => {

        fileBrowseInputRef.current?.click();
    };

    return {
        _fileBrowseInputRef: fileBrowseInputRef,
        _onFileSelected,
        selectFile,
        selectedFileData,
        type
    };
};

export type FileSelectorLogicType = ReturnType<typeof useFileSelectorLogic>;