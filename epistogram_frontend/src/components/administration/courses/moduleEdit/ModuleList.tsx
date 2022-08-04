import { Flex } from '@chakra-ui/react';
import { Delete, Edit } from '@mui/icons-material';
import { MutableRefObject } from 'react';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { Id } from '../../../../shared/types/versionId';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { IXMutator } from '../../../lib/XMutator/XMutatorCore';
import { FlexListItem } from '../../../universal/FlexListItem';

export const ModuleList = ({
    canDelete,
    editModule,
    mutator
}: {
    mutator: MutableRefObject<IXMutator<ModuleEditDTO, 'versionId', Id<'ModuleVersion'>>>,
    editModule: (moduleVersionId: Id<'ModuleVersion'>) => void,
    canDelete: (moduleVersionId: Id<'ModuleVersion'>) => boolean
}) => {

    return (
        <Flex
            flex="1"
            p="20px">

            <Flex
                flex="1"
                direction="column"
                className="roundBorders largeSoftShadow"
                background="var(--transparentWhite90)"
                padding="0 20px">

                <FlexListItem
                    h="50px"
                    thumbnailContent={<EpistoFont
                        style={{
                            fontWeight: 600
                        }}>

                        Modulok
                    </EpistoFont>} />

                <Flex direction='column'>
                    {mutator
                        .current
                        .mutatedItems
                        .map((module, i) => <EpistoFlex
                            key={i}
                            flex="1"
                            direction="horizontal">

                            <FlexListItem
                                flex="1"
                                h="50px"
                                className='dividerBorderBottom'
                                midContent={(
                                    <EpistoEntry
                                        marginTop="0"
                                        flex="1"
                                        value={module.name}
                                        onFocusLost={x => mutator
                                            .current
                                            .mutate({
                                                key: module.versionId,
                                                field: 'name',
                                                newValue: x
                                            })}
                                        style={{
                                            background: mutator.current.isAnyFieldMutated(module.versionId)
                                                ? 'var(--intenseYellow)'
                                                : undefined
                                        }} />
                                )}
                                endContent={<Flex>

                                    <EpistoButton
                                        onClick={() => editModule(module.versionId)}>

                                        <Edit />
                                    </EpistoButton>

                                    <EpistoButton
                                        onClick={() => mutator.current.remove(module.versionId)}
                                        isDisabled={!canDelete(module.versionId)}>

                                        <Delete />
                                    </EpistoButton>
                                </Flex>
                                } />
                        </EpistoFlex>)}
                </Flex>
            </Flex>
        </Flex>
    );
};