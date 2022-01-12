import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { usePurchaseShopItem } from "../../services/api/shopApiService";
import { useNavigation } from "../../services/core/navigatior";
import { useShowErrorDialog } from "../../services/core/notifications";
import { usePaging } from "../../static/frontendHelpers";
import { EpistoDialog, EpistoDialogLogicType } from "../EpistoDialog";
import { EpistoButton } from "../universal/EpistoButton";
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

            <Typography className="dividerBorderBottom" style={{ padding: "10px" }}>
                {isCourse
                    ? "Biztonsan feloldod az alábbi tanfolyamot?"
                    : "Biztonsan megveszed az alábbi terméket?"}
            </Typography>

            <img
                style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    margin: "10px",
                    width: "400px"
                }}
                src={shopItem?.coverFilePath}
                alt="" />

            <Typography
                style={{
                    fontWeight: "bold",
                    maxWidth: "300px"
                }}>

                {shopItem?.name}
            </Typography>

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
            <Typography>
                {isCourse
                    ? "Sikeresen feloldottad a tanfolyamot!"
                    : "Sikeresen megvásároltad a terméket!"}
            </Typography>

            {/* info */}
            <Typography>
                {isCourse
                    ? "Mostantól megtalálhatod a Tanfolyamkeresőben is!"
                    : `Kodod amit bevalthatsz a partner cegunknel: ${purchaseShopItemResult?.discountCode}`}
            </Typography>

            {/* details */}
            {!isCourse && <Typography>
                A kodod emailben is elkuldtuk Neked, hogy kesobb konnyen megtalalhasd!
            </Typography>}

            {isCourse && <EpistoButton
                onClick={() => {

                    const code = purchaseShopItemResult?.firstItemCode;
                    if (!code)
                        return;

                    navigateToPlayer(code);
                }}
                variant="colored">

                Irany a tanfolyam!
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