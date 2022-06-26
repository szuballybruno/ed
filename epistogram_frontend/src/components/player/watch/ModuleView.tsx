import { Flex } from '@chakra-ui/layout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';
import { ModuleDetailedDTO } from '../../../shared/dtos/ModuleDetailedDTO';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoHeader } from '../../EpistoHeader';

export const ModuleView = (params: {
    module?: ModuleDetailedDTO,
    startModule: () => void,
}) => {

    const { module, startModule } = params;
    const isVisible = !!module;

    return <Flex
        className="roundBorders mildShadow"
        display={isVisible ? undefined : 'none'}
        direction="column"
        background="var(--transparentWhite70)">

        <Flex
            height="500px"
            maxH="500px"
            align="center"
            justify="center">

            <Flex direction="row"
                align="center">

                {module?.imageFilePath && <Flex>
                    <img
                        className="roundBorders"
                        src={module?.imageFilePath ?? ''}
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            margin: 10
                        }} />
                </Flex>}

                <Flex
                    maxW="300px"
                    direction="column"
                    justify="center">

                    <EpistoHeader
                        text={module?.name ?? ''}
                        variant="giant" />

                    <EpistoFont>
                        {module?.description}
                    </EpistoFont>
                </Flex>
            </Flex>
        </Flex>

        <Flex
            height="60px"
            borderTop="1px solid var(--mildGrey)"
            justify="flex-end"
            p="10px">

            <EpistoButton variant="colored"
                onClick={startModule}
                padding="0">

                <Flex className="whall"
                    mx="15px"
                    align="center">
                    <EpistoFont
                        isUppercase
                        style={{ marginRight: '5px' }}
                        fontSize="fontSmall">

                        {translatableTexts.player.moduleView.letsStart}
                    </EpistoFont>

                    <ArrowForwardIcon></ArrowForwardIcon>
                </Flex>
            </EpistoButton>
        </Flex>
    </Flex>;
};