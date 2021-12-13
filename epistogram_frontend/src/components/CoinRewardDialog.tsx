import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";
import { getAssetUrl } from "../static/frontendHelpers";
import { EpistoDialog, EpistoDialogLogicType } from "./EpistoDialog";
import { EpistoButton } from "./universal/EpistoButton";

export const CoinRewardDialog = (props: {
    coinRewardAmount: number,
    text: string,
    lottiePath: string,
    dialogLogic: EpistoDialogLogicType
}) => {

    const { dialogLogic, lottiePath, coinRewardAmount, text } = props;

    return <EpistoDialog logic={dialogLogic}>
        <Flex
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
                    src={getAssetUrl(lottiePath)}
                    style={{ position: "absolute", width: "100%", height: "100%" }} />
            </Box>

            <Typography className="fontDark" noWrap>
                {text}
            </Typography>

            <Flex align="flex-end" mt="10px">
                <Typography className="fontGiant" style={{ color: "var(--epistoTeal)", fontWeight: "bold" }}>
                    {coinRewardAmount}
                </Typography>

                <Typography className="fontDark" style={{ margin: "0px 0px 4px 4px" }}>
                    EpistoCoin
                </Typography>

                <img
                    src={getAssetUrl("images/epistoCoin.png")}
                    className="square25"
                    style={{ margin: "0px 0px 4px 4px" }} />

                <EpistoButton
                    variant="colored"
                    style={{ margin: "0px 0px 0px 15px" }}
                    onClick={() => dialogLogic.closeDialog()}>

                    Begyűjtöm!
                </EpistoButton>
            </Flex>
        </Flex>
    </EpistoDialog>
}