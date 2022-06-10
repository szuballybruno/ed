import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import { Done, LocalOffer } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { ShopItemDTO } from '../../shared/dtos/ShopItemDTO';

import { translatableTexts } from '../../static/translatableTexts';
import StarsIcon from '@mui/icons-material/Stars';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';
import { FlexFloat } from '../controls/FlexFloat';
import { EpistoFont } from '../controls/EpistoFont';
import { Environment } from '../../static/Environemnt';

export const ShopItem = (props: {
    shopItem: ShopItemDTO,
    isSufficientFundsAvailable: boolean,
    tempIsStartedSwitch?: boolean,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void
} & FlexProps) => {

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
        <Box flex="7"
            position="relative"
            minH={150}
            maxH={150}>

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
            {isPurchased && <Flex
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
            </Flex>}

            {/*  purchase overlay 
            {isPurchased && <Flex
                className="whall"
                position="absolute"
                align="flex-start"
                justify="flex-end">

                <Flex
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
                </Flex>

            </Flex>} */}
        </Box>

        {/* title */}
        <Box flex="3"
            flexBasis="80px"
            zIndex={1}>

            <Flex direction="column"
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
            </Flex>
        </Box>

        {/* prices */}
        {!isPurchased &&
            <Flex alignItems={'center'}
                justifyContent={'center'}
                mb="5px">
                <Flex alignItems={'center'}>
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
                </Flex>
            </Flex>}

        {/* buttons */}
        <Flex height="40px"
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
        </Flex>
    </FlexFloat>;
};
