import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { CalendarToday, Download, FileCopy } from '@mui/icons-material';
import React from 'react';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { FlexListItem } from '../../universal/FlexListItem';
import { FloatChip } from '../../universal/FloatChip';

export const VideoContent = () => {
    const chips = [
        {
            name: '32KB',
            icon: <FileCopy />
        },
        {
            name: '2021. 05. 12.',
            icon: <CalendarToday />
        }
    ];
    return <Flex minH={600}
        direction={'column'}
        width="100%">
        <FlexListItem
            align="center"
            p="5px"
            thumbnailContent={<Image
                className="square70"
                src={Environment.getAssetUrl('file_extension_icons/001-xlsx-1.svg')}
                objectFit="cover"
                m="10px" />}
            midContent={<Flex className="whall"
                direction="column">
                <Flex ml={10}>
                    <EpistoFont>
                        {'Munkafüzet1.xlsx'}
                    </EpistoFont>
                </Flex>
                <Box>
                    <Flex wrap="wrap"
                        mt="10px">
                        {chips
                            .map((chip, index) => <FloatChip
                                key={index}
                                name={chip.name}
                                icon={chip.icon}
                                padding="5px" />)}
                    </Flex>
                </Box>
            </Flex>}
            endContent={<Flex align="center">
                <EpistoButton variant="colored"
                    style={{ padding: '3px' }}>
                    <Download className="square25" />
                </EpistoButton>
            </Flex>}>

        </FlexListItem>
    </Flex>;
};
