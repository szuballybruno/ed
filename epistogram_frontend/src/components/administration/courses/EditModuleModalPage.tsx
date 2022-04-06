import { Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useModuleEditData } from '../../../services/api/moduleApiService';
import { ModuleAdminEditDTO } from '../../../shared/dtos/ModuleAdminEditDTO';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { LoadingFrame } from '../../system/LoadingFrame';
import { SelectImage } from '../../universal/SelectImage';

export const EditModuleModalPage = (props: {
    handleSaveModuleAsync: (module: ModuleAdminEditDTO, moduleImageFile: File | null) => void,
    editedModuleId: number
}) => {

    const { handleSaveModuleAsync, editedModuleId } = props;

    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [moduleImageSource, setMoudleImageSource] = useState<string | null>(null);
    const [moduleImageFile, setMoudleImageFile] = useState<File | null>(null);

    const { moduleEditData } = useModuleEditData(editedModuleId);

    const handleSaveModule = () => {
        handleSaveModuleAsync(
            {
                id: editedModuleId,
                name: moduleName,
                description: moduleDescription
            } as ModuleAdminEditDTO,
            moduleImageFile);
    };

    useEffect(() => {

        if (!moduleEditData)
            return;

        setModuleName(moduleEditData.name);
        setModuleDescription(moduleEditData.description);
        setMoudleImageSource(moduleEditData.imageFilePath);
    }, [moduleEditData]);

    return <LoadingFrame
        direction="column"
        justify="flex-start"
        p="10px"
        flex="1">

        <Flex
            className="roundBorders"
            background="var(--transparentWhite70)"
            mt="5px"
            p="0 10px 10px 10px"
            direction="column">

            <EpistoLabel
                text="Üdvözlő kép"
                isOverline>

                <SelectImage
                    width="220px"
                    height="130px"
                    background="#DDD"
                    my="10px"
                    className="roundBorders mildShadow"
                    setImageSource={setMoudleImageSource}
                    setImageFile={setMoudleImageFile}>

                    {moduleImageSource && <Image
                        className="whall"
                        objectFit="cover"
                        src={moduleImageSource ?? ''} />}
                </SelectImage>
            </EpistoLabel>

            <EpistoEntry
                labelVariant='top'
                label="Modul neve"
                value={moduleName}
                setValue={setModuleName} />

            <EpistoEntry
                labelVariant='top'
                label="Modul leírása"
                value={moduleDescription}
                setValue={setModuleDescription}
                isMultiline />
        </Flex>

        <EpistoButton
            variant='colored'
            style={{
                position: 'absolute',
                bottom: '10px',
                width: 'calc(100% - 20px)',
                background: 'var(--deepBlue)'
            }}
            onClick={() => handleSaveModule()}>

            Mentés
        </EpistoButton>
    </LoadingFrame>;
};
