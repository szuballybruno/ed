import {Done, LocalOffer} from '@mui/icons-material';
import React from 'react';
import {ShopItemDTO} from '../../shared/dtos/ShopItemDTO';

import {translatableTexts} from '../../static/translatableTexts';
import {useNavigation} from '../../services/core/navigatior';
import {EpistoButton} from '../controls/EpistoButton';
import {FlexFloat} from '../controls/FlexFloat';
import {EpistoFont} from '../controls/EpistoFont';
import {Environment} from '../../static/Environemnt';
import {EpistoFlex2, EpistoFlex2Props} from '../controls/EpistoFlex';
import {EpistoDiv} from '../controls/EpistoDiv';

export const ShopItem = (props: {
    shopItem: ShopItemDTO,
    isSufficientFundsAvailable: boolean,
    tempIsStartedSwitch?: boolean,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void
} & EpistoFlex2Props) => {

    const { shopItem, children, isSufficientFundsAvailable, handlePurchaseItem, ...css } = props;
    const { name, coinPrice, canPurchase, purchaseCount, coverFilePath, detailsUrl, courseId, currencyPrice, shopItemCategoryName } = shopItem;
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

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
        position="relative"
        overflow="hidden"
        shadow={'0 0 10px 1px #CCC'}
        p="5px"
        background="var(--transparentWhite70)"
        justifyContent="space-between"
        {...css}>

        {/* cover image box */}
        <EpistoDiv flex="7"
            position="relative"
            minH='150px'
            maxH='150px'>

            {/* cover image */}
            <img
                className="roundBorders"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute'
                }}
                src={coverFilePath}
                alt="" />

            {/* is purchased label */}
            {isPurchased && <EpistoFlex2
                position="absolute"
                align="center"
                width="100%"
                bottom="0"
                padding="5px 20px"
                borderRadius="0px 0 6px 6px"
                background="rgba(0, 220, 122, 0.95)"
                right="0">

                <Done style={{
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
            </EpistoFlex2>}

            {/*  purchase overlay
            {isPurchased && <EpistoFlex2
                className="whall"
                position="absolute"
                align="flex-start"
                justify="flex-end">

                <EpistoFlex2
                    background="gold"
                    p="5px 5px 5px 10px"
                    borderRadius="0 0 0 10px"
                    boxShadow="0 0 20px 0px #00000035">

                    <EpistoFont
                        classes={["fontLight"]}
                        style={{
                            marginRight: "5px",
                        }}>

                        Megvéve!
                    </EpistoFont>

                    <StarsIcon style={{ color: "white" }}></StarsIcon>
                </EpistoFlex2>

            </EpistoFlex2>} */}
        </EpistoDiv>

        {/* title */}
        <EpistoDiv flex="3"
            flexBasis="80px"
            zIndex={1}>

            <EpistoFlex2 direction="column"
                p="10px" >

                {/* category  */}
                <EpistoFont
                    color='fontGray'
                    fontSize="fontSmall">

                    {shopItemCategoryName}
                </EpistoFont>

                {/* title */}
                <EpistoFont
                    fontSize="fontMid"
                    style={{
                        fontWeight: 600
                    }}>

                    {name}
                </EpistoFont>
            </EpistoFlex2>
        </EpistoDiv>

        {/* prices */}
        {!isPurchased &&
            <EpistoFlex2 alignItems={'center'}
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
            </EpistoFlex2>}

        {/* buttons */}
        <EpistoFlex2 height="40px"
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
        </EpistoFlex2>
    </FlexFloat>;
};
