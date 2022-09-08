import { Box } from '@chakra-ui/layout';
import { Player } from '@lottiefiles/react-lottie-player';
import { Environment } from '../static/Environemnt';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoDialog } from './universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from './universal/epistoDialog/EpistoDialogTypes';

export const CoinRewardDialog = (props: {
    coinRewardAmount: number,
    text: string,
    lottiePath: string,
    dialogLogic: EpistoDialogLogicType
}) => {

    const { dialogLogic, lottiePath, coinRewardAmount, text } = props;

    if (!lottiePath)
        return <></>;

    return <EpistoDialog logic={dialogLogic}>
        <EpistoFlex2
            direction="column"
            borderRadius="5px"
            border="solid 5px var(--epistoTeal)"
            align="center"
            justify="center"
            pb="40px"
            px="80px">

            <Box
                pos="relative"
                width="300px"
                height="300px">

                <Player
                    autoplay
                    loop
                    src={Environment.getAssetUrl(lottiePath)}
                    style={{ position: 'absolute', width: '100%', height: '100%' }} />
            </Box>

            <EpistoFont
                color="fontDark">

                {text}
            </EpistoFont>

            <EpistoFlex2 align="flex-end"
                mt="10px">

                <EpistoFont fontSize="fontGiant"
                    style={{ color: 'var(--epistoTeal)', fontWeight: 'bold' }}>
                    {coinRewardAmount}
                </EpistoFont>

                <EpistoFont
                    color='fontDark'
                    style={{ margin: '0px 0px 4px 4px' }}>

                    EpistoCoin
                </EpistoFont>

                <img
                    src={Environment.getAssetUrl('images/epistoCoin.png')}
                    className="square25"
                    style={{ margin: '0px 0px 4px 4px' }} />

                <EpistoButton
                    variant="colored"
                    style={{ margin: '0px 0px 0px 15px' }}
                    onClick={() => dialogLogic.closeDialog()}>

                    Begyűjtöm!
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoDialog>;
};