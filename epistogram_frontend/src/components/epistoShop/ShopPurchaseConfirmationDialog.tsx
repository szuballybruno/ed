import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { usePurchaseShopItem } from '../../services/api/shopApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { ShopItemDTO } from '../../shared/dtos/ShopItemDTO';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';
import { EpistoPaging } from '../universal/EpistoPaging';

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

    const { openNewTab } = useNavigation();

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
    };

    // reset paging when dialog is closed 
    useEffect(() => {

        if (!dialogLogic.isOpen)
            paging.setItem(0);
    }, [dialogLogic.isOpen]);

    const confirmationSlide = () => (
        <Flex direction="column"
align="center"
w="500px">

            <EpistoFont
                classes={['dividerBorderBottom']}
                style={{
                    padding: '10px'
                }}>

                {isCourse
                    ? translatableTexts.shop.purchaseConfirmationDialog.unlockCourse
                    : translatableTexts.shop.purchaseConfirmationDialog.unlockItem}
            </EpistoFont>

            <img
                style={{
                    objectFit: 'cover',
                    borderRadius: 10,
                    margin: '10px',
                    width: '400px'
                }}
                src={shopItem?.coverFilePath}
                alt="" />

            <EpistoFont
                style={{
                    fontWeight: 'bold',
                    maxWidth: '300px'
                }}>

                {shopItem?.name}
            </EpistoFont>

            <EpistoButton
                style={{
                    margin: '15px 0'
                }}
                variant="colored"
                onClick={onConfirmPurchaseAsync}>

                {translatableTexts.shop.purchaseConfirmationDialog.unlock}
            </EpistoButton>
        </Flex>
    );

    const feedbackSlide = () => (
        <Flex
            direction="column"
            align="center"
            w="500px"
            h="200px"
            justify="space-between"
            p="20px">

            {/* greet */}
            <EpistoFont>
                {isCourse
                    ? translatableTexts.shop.purchaseConfirmationDialog.courseSuccessfullyUnlocked
                    : translatableTexts.shop.purchaseConfirmationDialog.itemSuccessfullyPurchased}
            </EpistoFont>

            {/* info */}
            <EpistoFont>
                {isCourse
                    ? translatableTexts.shop.purchaseConfirmationDialog.canBeFoundInTheCourseSearch
                    : `${translatableTexts.shop.purchaseConfirmationDialog.yourCode} ${purchaseShopItemResult?.discountCode}`}
            </EpistoFont>

            {/* details */}
            {!isCourse && <EpistoFont>
                {translatableTexts.shop.purchaseConfirmationDialog.codeHasBeenSent}
            </EpistoFont>}

            {isCourse ? <EpistoButton
                onClick={() => {

                    const code = purchaseShopItemResult?.firstItemCode;
                    if (!code)
                        return;

                    navigateToPlayer(code);
                }}
                variant="colored">

                {translatableTexts.shop.purchaseConfirmationDialog.letsGoToCourse}
            </EpistoButton> : <EpistoButton
                onClick={() => {
                    //openNewTab(detailsUrl); //TODO: Details url should be here
                }}>

                {translatableTexts.shop.purchaseConfirmationDialog.itemPage}
            </EpistoButton>}
        </Flex>
    );

    return <EpistoDialog logic={dialogLogic}>

        <EpistoPaging
            slides={[confirmationSlide, feedbackSlide]}
            index={paging.currentIndex}
            justify="center" />
    </EpistoDialog>;
};
