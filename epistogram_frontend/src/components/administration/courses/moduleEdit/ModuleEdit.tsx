import { Image } from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { ModuleApiService } from '../../../../services/api/MModuleApiService';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { Id } from '../../../../shared/types/versionId';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { IXMutator } from '../../../lib/XMutator/XMutatorCore';
import { EpistoImageSelector } from '../../../universal/EpistoImageSelector';

export const ModuleEdit = ({
    mutator,
    dto
}: {
    mutator: MutableRefObject<IXMutator<ModuleEditDTO, 'versionId', Id<'ModuleVersion'>>>,
    dto: ModuleEditDTO
}) => {

    const { saveCoverFile } = ModuleApiService.useSaveCoverFile();

    return (
        <EpistoFlex2
            padding="10px"
            bg="white"
            width="100%"
            direction="column">

            <EpistoLabel
                text="Üdvözlő kép"
                isOverline>

                <EpistoImageSelector
                    width="220px"
                    height="130px"
                    background="#DDD"
                    my="10px"
                    className="roundBorders mildShadow"
                    setImageSource={(src) => mutator
                        .current
                        .mutate({
                            key: dto.versionId,
                            field: 'imageFilePath',
                            newValue: src
                        })}
                    setImageFile={file => saveCoverFile({ moduleVersionId: dto.versionId }, { file })}>

                    {dto.imageFilePath && <Image
                        className="whall"
                        objectFit="cover"
                        src={dto.imageFilePath ?? ''} />}
                </EpistoImageSelector>
            </EpistoLabel>

            <EpistoEntry
                labelVariant='top'
                label="Modul neve"
                value={dto.name}
                onFocusLost={x => mutator
                    .current
                    .mutate({
                        key: dto.versionId,
                        field: 'name',
                        newValue: x
                    })} />

            <EpistoEntry
                labelVariant='top'
                label="Modul leírása"
                value={dto.description}
                onFocusLost={x => mutator
                    .current
                    .mutate({
                        key: dto.versionId,
                        field: 'description',
                        newValue: x
                    })}
                isMultiline />
        </EpistoFlex2>
    );
};
