import { Flex } from '@chakra-ui/react';
import { InfoOutlined } from '@mui/icons-material';
import { TempomatModeType } from '../../../shared/types/sharedTypes';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { TempomatModeImage } from './TempomatModeImage';

export const TempomatTempoInfo = (props: {
    onClick: () => void,
    tempomatMode: TempomatModeType
}) => {

    const { onClick, tempomatMode } = props;

    const tempomatLabel = (() => {

        if (tempomatMode === 'auto')
            return 'Automata';

        if (tempomatMode === 'balanced')
            return 'Kiegyensúlyozott';

        if (tempomatMode === 'light')
            return 'Megengedő';

        return 'Szigorú';
    })();

    return (
        <Flex direction="column">

            {/* Current speed title and info */}
            <Flex
                align="center">

                <EpistoFont fontSize="fontSmall">

                    A tanfolyam tempója
                </EpistoFont>

                <InfoOutlined
                    style={{
                        height: '15px'
                    }} />
            </Flex>

            {/* Current speed and settings button */}
            <EpistoButton
                onClick={onClick}>

                <Flex
                    align="center"
                    flex="1">

                    <TempomatModeImage
                        isSmall
                        mode={tempomatMode}
                        customizeFn={builder => builder
                            .custom('square25')} />

                    <EpistoFont
                        fontSize="fontSmall"
                        style={{
                            margin: '0 5px',
                            fontWeight: 600
                        }}>

                        {tempomatLabel}
                    </EpistoFont>

                    <img
                        src={Environment.getAssetUrl('/images/tempomatsettings.png')}
                        alt=""
                        style={{
                            height: '20px',
                            width: '20px',
                            marginRight: 5
                        }} />
                </Flex>
            </EpistoButton>
        </Flex>
    );
};