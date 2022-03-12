import { useEffect, useState } from "react";
import { EventCoinAcquireNotificationDTO } from "../../shared/dtos/EventCoinAcquireNotificationDTO";
import { translatableTexts } from "../../static/translatableTexts";
import { CoinRewardDialog } from "../CoinRewardDialog";
import { useEpistoDialogLogic } from "../EpistoDialog";

export const CoinRewardEventHandler = (props: {
    data: EventCoinAcquireNotificationDTO | null
}) => {

    const { data } = props;

    const dialogLogic = useEpistoDialogLogic({ defaultCloseButtonType: "none" });
    const [coinRewardAmount, setCoinRewardAmount] = useState(0);
    const [coinRewardLottie, setCoinRewardLottie] = useState("");
    const [coinRewardText, setCoinRewardText] = useState("");

    useEffect(() => {

        if (!data)
            return;

        // set dialog props 
        setCoinRewardAmount(data.amount);

        if (data.reason === "activity_streak_3_days") {

            setCoinRewardLottie("lottie_json/session_streak_3.json");
            setCoinRewardText(translatableTexts.eventListener.threeDaysStreak);
        }

        if (data.reason === "activity_streak_5_days") {
            setCoinRewardLottie("lottie_json/session_streak_5.json");
            setCoinRewardText(translatableTexts.eventListener.fiveDaysStreak);
        }

        if (data.reason === "activity_streak_10_days") {
            setCoinRewardLottie("lottie_json/session_streak_10.json");
            setCoinRewardText(translatableTexts.eventListener.tenDaysStreak);
        }

        dialogLogic.openDialog();
    }, [data]);

    return <CoinRewardDialog
        lottiePath={coinRewardLottie}
        coinRewardAmount={coinRewardAmount}
        dialogLogic={dialogLogic}
        text={coinRewardText} />
}