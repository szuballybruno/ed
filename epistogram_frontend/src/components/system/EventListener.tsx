import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react"
import { getAssetUrl } from "../../frontendHelpers";
import { EventCoinAcquireNotificationDTO } from "../../models/shared_models/EventCoinAcquireNotificationDTO";
import { useEventListener } from "../../services/eventService";
import { EpistoDialog, useEpistoDialogLogic } from "../EpistoDialog";

export const EventListener = (props: { children: ReactNode }) => {

    const { children } = props;

    const { event } = useEventListener();
    const dialogLogic = useEpistoDialogLogic({ hideDefaultCloseButton: true });
    const [coinRewardAmount, setCoinRewardAmount] = useState(0);

    useEffect(() => {

        if (!event)
            return;

        if (event.type === "coin_acquire") {

            const coinAcEvent = event.data as EventCoinAcquireNotificationDTO;

            setCoinRewardAmount(coinAcEvent.amount);
            dialogLogic.openDialog();
        }

    }, [event]);

    return <>

        <EpistoDialog logic={dialogLogic}>
            <Flex
                direction="column"
                borderRadius="5px"
                border="solid 5px var(--epistoTeal)"
                align="center"
                justify="center"
                pb="40px">

                <Box
                    pos="relative"
                    width="300px"
                    height="300px">

                    <Player
                        autoplay
                        loop
                        src={getAssetUrl("lottie_json/session_streak_3.json")}
                        style={{ position: "absolute", width: "100%", height: "115%" }} />
                </Box>

                <Typography className="fontSmall fontColorSecondary">
                    {coinRewardAmount} egymást követő kérdésre válaszoltál helyes, jutalmad pedig
                </Typography>

                <Flex align="flex-end">
                    <Typography className="fontGiant" style={{ color: "var(--epistoTeal)", fontWeight: "bold" }}>
                        {coinRewardAmount}
                    </Typography>

                    <Typography className="fontColorSecondary" style={{ margin: "0px 0px 4px 4px" }}>
                        EpistoCoin
                    </Typography>
                </Flex>
            </Flex>
        </EpistoDialog>

        {children}
    </>
}