import { Player } from '@lottiefiles/react-lottie-player';
import { Environment } from '../static/Environemnt';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoDiv } from './controls/EpistoDiv';
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
            border="solid 5px var(--eduptiveYellowGreen)"
            align="center"
            justify="center"
            pb="40px"
            px="80px">

            <EpistoDiv
                pos="relative"
                width="300px"
                height="300px">

                <Player
                    autoplay
                    loop
                    src={Environment.getAssetUrl(lottiePath)}
                    style={{ position: 'absolute', width: '100%', height: '100%' }} />
            </EpistoDiv>

            <EpistoFont
                textColor='eduptiveDeepDarkGreen'>

                {text}
            </EpistoFont>

            <EpistoFlex2 align="flex-end"
                mt="10px">

                <EpistoFont
                    fontSize="font26"
                    textColor='white'
                    style={{ color: 'var(--eduptiveYellowGreen)', fontWeight: 'bold' }}>
                    {coinRewardAmount}
                </EpistoFont>

                <EpistoFont
                    textColor='eduptiveDeepDarkGreen'
                    style={{ margin: '0px 0px 4px 4px' }}>

                    EpistoCoin
                </EpistoFont>

                <img
                    src={Environment.getAssetUrl('images/epistoCoin.png')}
                    className="square25"
                    style={{ margin: '0px 0px 4px 4px' }} />

                <EpistoButton
                    variant="action"
                    style={{ margin: '0px 0px 0px 15px' }}
                    onClick={() => dialogLogic.closeDialog()}>

                    Begyűjtöm!
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoDialog>;
};