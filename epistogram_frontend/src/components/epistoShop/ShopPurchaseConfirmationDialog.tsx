import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { usePurchaseShopItem } from "../../services/api/shopApiService";
import { useNavigation } from "../../services/core/navigatior";
import { useShowErrorDialog } from "../../services/core/notifications";
import { usePaging } from "../../static/frontendHelpers";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoFont } from "../controls/EpistoFont";
import { EpistoDialog, EpistoDialogLogicType } from "../EpistoDialog";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ShopPurchaseConfirmationDialog = (props: {
    dialogLogic: EpistoDialogLogicType,
    shopItem: ShopItemDTO | null,
    onSuccessfulPurchase: () => void
}) => {

    const { dialogLogic, shopItem, onSuccessfulPurchase } = props;
    const paging = usePaging([1, 2]);
    const isCourse = !!shopItem?.courseId;
    const { navigateToPlayer } = useNavigation();

    const showError = useShowErrorDialog();

    const { purchaseShopItemAsync, purchaseShopItemState, purchaseShopItemResult } = usePurchaseShopItem();

    const onConfirmPurchaseAsync = async () => {

        if (!shopItem)
            return;

        try {

            await purchaseShopItemAsync({ shopItemId: shopItem.id });
            paging.next();
            onSuccessfulPurchase();
        }
        catch (e) {

            showError(e);
        }
    }

    // reset paging when dialog is closed 
    useEffect(() => {

        if (!dialogLogic.isOpen)
            paging.setItem(0);
    }, [dialogLogic.isOpen])

    const confirmationSlide = () => (
        <Flex direction="column" align="center">

            <EpistoFont
                classes={["dividerBorderBottom"]}
                style={{
                    padding: "10px"
                }}>

                {isCourse
                    ? "Biztonsan feloldod az alábbi tanfolyamot?"
                    : "Biztonsan megveszed az alábbi terméket?"}
            </EpistoFont>

            <img
                style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    margin: "10px",
                    width: "400px"
                }}
                src={shopItem?.coverFilePath}
                alt="" />

            <EpistoFont
                style={{
                    fontWeight: "bold",
                    maxWidth: "300px"
                }}>

                {shopItem?.name}
            </EpistoFont>

            <EpistoButton
                variant="colored"
                onClick={onConfirmPurchaseAsync}>

                Fizetés
            </EpistoButton>
        </Flex>
    );

    const feedbackSlide = () => (
        <Flex direction="column">

            {/* greet */}
            <EpistoFont>
                {isCourse
                    ? "Sikeresen feloldottad a tanfolyamot!"
                    : "Sikeresen megvásároltad a terméket!"}
            </EpistoFont>

            {/* info */}
            <EpistoFont>
                {isCourse
                    ? "Mostantól megtalálhatod a Tanfolyamkeresőben is!"
                    : `Kodod amit bevalthatsz a partner cegunknel: ${purchaseShopItemResult?.discountCode}`}
            </EpistoFont>

            {/* details */}
            {!isCourse && <EpistoFont>
                A kodod emailben is elkuldtuk Neked, hogy kesobb konnyen megtalalhasd!
            </EpistoFont>}

            {isCourse && <EpistoButton
                onClick={() => {

                    const code = purchaseShopItemResult?.firstItemCode;
                    if (!code)
                        return;

                    navigateToPlayer(code);
                }}
                variant="colored">

                Irány a tanfolyam!
            </EpistoButton>}
        </Flex>
    );

    return <EpistoDialog logic={dialogLogic}>

        <SlidesDisplay
            slides={[confirmationSlide, feedbackSlide]}
            index={paging.currentIndex}
            justify="center" />
    </EpistoDialog>
}