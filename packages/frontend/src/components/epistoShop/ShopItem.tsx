import { Done, LocalOffer } from '@mui/icons-material';
import { ShopItemDTO } from '../../shared/dtos/ShopItemDTO';

import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { VerticalTile } from '../universal/verticalTile/VerticalTile';
import { VerticalTileImage } from '../universal/verticalTile/VerticalTileImage';

export const ShopItemIsPurchasedLabel = () => {

    return <EpistoFlex2
        position="absolute"
        align="center"
        width="100%"
        bottom="0"
        padding="5px 20px"
        borderRadius="0px 0 6px 6px"
        background="rgba(0, 220, 122, 0.95)"
        right="0">

        <Done
            style={{
                color: 'white',
                padding: 0,
                margin: 0,
                lineHeight: 1
            }} />

        <EpistoFont
            color="fontLight"
            isUppercase
            fontSize="fontSmall"
            fontWeight="normal">

            Megvásárolva
        </EpistoFont>
    </EpistoFlex2>;
};

export const ShopItemPrices = (props: {
    coinPrice: number,
    isSufficientFundsAvailable: boolean
}) => {

    const {
        coinPrice,
        isSufficientFundsAvailable
    } = props;

    return <EpistoFlex2 alignItems={'center'}
        justifyContent={'center'}
        mb="5px">
        <EpistoFlex2 alignItems={'center'}>
            <LocalOffer style={{
                height: 17,
                transform: 'scaleX(-1)'
            }} />

            {/* episto coin price */}
            <EpistoFont style={{ color: isSufficientFundsAvailable ? 'var(--deepGreen)' : 'var(--mildRed)' }}>
                {`Ár: ${coinPrice}`}
            </EpistoFont>
            <img
                style={{
                    width: 20,
                    height: 20,
                    margin: 2
                }}
                src={Environment.getAssetUrl('/images/epistoCoin.png')}
                alt={''} />

            {/* currency price
    {currencyPrice && `\xa0 és csak ${currencyPrice}Ft`}*/}
        </EpistoFlex2>
    </EpistoFlex2>;
};

export const ShopItemButtons = (props: {
    shopItem: ShopItemDTO,
    handleOpenDetails: () => void,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void,
    canPurchase: boolean,
    isPurchased: boolean,
    isSufficientFundsAvailable: boolean
}) => {

    const {
        shopItem,
        handleOpenDetails,
        handlePurchaseItem,
        canPurchase,
        isPurchased,
        isSufficientFundsAvailable
    } = props;

    return <EpistoFlex2 height="40px"
        margin="5px 5px 5px 5px">

        {/* item details */}
        <EpistoButton
            onClick={() => handleOpenDetails()}
            style={{ flex: '1' }}>
            {translatableTexts.shop.description}
        </EpistoButton>

        {/* purcahase item */}
        {canPurchase && <EpistoButton
            onClick={() => handlePurchaseItem(shopItem)}
            variant="colored"
            isDisabled={!isSufficientFundsAvailable}
            style={{ flex: '3', overflowWrap: 'break-word' }}>

            {shopItem.courseId
                ? 'Feloldom'
                : isPurchased
                    ? translatableTexts.shop.buyAgain
                    : translatableTexts.shop.buy}
        </EpistoButton>}
    </EpistoFlex2>;
};

export const ShopItem = (props: {
    shopItem: ShopItemDTO,
    isSufficientFundsAvailable: boolean,
    tempIsStartedSwitch?: boolean,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void
} & EpistoFlex2Props) => {

    const { shopItem, children, isSufficientFundsAvailable, handlePurchaseItem, ...css } = props;
    const { name, coinPrice, canPurchase, purchaseCount, coverFilePath, detailsUrl, courseId, shopItemCategoryName } = shopItem;
    const isPurchased = purchaseCount > 0;
    const { openNewTab, navigateToCourseDetails } = useNavigation();

    const handleOpenDetails = () => {

        if (courseId) {

            navigateToCourseDetails(courseId);
        }
        else {

            openNewTab(detailsUrl);
        }
    };

    return <VerticalTile
        title={name}
        subTitle={shopItemCategoryName}
        imageComponent={<VerticalTileImage
            imageUrl={coverFilePath}
            badgeComponent={isPurchased && <ShopItemIsPurchasedLabel />}
        />}
        infoComponent={!isPurchased && <ShopItemPrices
            coinPrice={coinPrice}
            isSufficientFundsAvailable={isSufficientFundsAvailable}
        />}
        buttonsComponent={<ShopItemButtons
            handleOpenDetails={handleOpenDetails}
            handlePurchaseItem={handlePurchaseItem}
            canPurchase={canPurchase}
            isPurchased={isPurchased}
            isSufficientFundsAvailable={isSufficientFundsAvailable}
            shopItem={shopItem} />} />;
};
