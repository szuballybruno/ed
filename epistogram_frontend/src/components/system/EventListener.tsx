import { ReactNode, useEffect, useState } from "react";
import { EventCoinAcquireNotificationDTO } from "../../models/shared_models/EventCoinAcquireNotificationDTO";
import { useEventListener } from "../../services/api/eventApiService";
import { translatableTexts } from "../../static/translatableTexts";
import { CoinRewardDialog } from "../CoinRewardDialog";
import { useEpistoDialogLogic } from "../EpistoDialog";

export const EventListener = (props: { children: ReactNode }) => {

    const { children } = props;

    const { event } = useEventListener();
    const dialogLogic = useEpistoDialogLogic({ defaultCloseButtonType: "none" });
    const [coinRewardAmount, setCoinRewardAmount] = useState(0);
    const [coinRewardLottie, setCoinRewardLottie] = useState("");
    const [coinRewardText, setCoinRewardText] = useState("");

    useEffect(() => {

        if (!event)
            return;

        if (event.type === "coin_acquire_session_streak") {

            const coinAcEvent = event.data as EventCoinAcquireNotificationDTO;

            // set dialog props 
            setCoinRewardAmount(coinAcEvent.amount);

            if (coinAcEvent.reason === "activity_streak_3_days") {

                setCoinRewardLottie("lottie_json/session_streak_3.json");
                setCoinRewardText(translatableTexts.eventListener.threeDaysStreak);
            }

            if (coinAcEvent.reason === "activity_streak_5_days") {
                setCoinRewardLottie("lottie_json/session_streak_5.json");
                setCoinRewardText(translatableTexts.eventListener.fiveDaysStreak);
            }

            if (coinAcEvent.reason === "activity_streak_10_days") {
                setCoinRewardLottie("lottie_json/session_streak_10.json");
                setCoinRewardText(translatableTexts.eventListener.tenDaysStreak);
            }

            dialogLogic.openDialog();
        }

    }, [event]);

    return <>

        <CoinRewardDialog
            lottiePath={coinRewardLottie}
            coinRewardAmount={coinRewardAmount}
            dialogLogic={dialogLogic}
            text={coinRewardText} />

        {children}
    </>
}