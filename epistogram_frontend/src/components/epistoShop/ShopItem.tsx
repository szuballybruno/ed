import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LocalOffer } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { getAssetUrl } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoButton } from "../universal/EpistoButton";
import { FlexFloat } from "../universal/FlexFloat";
import StarsIcon from '@mui/icons-material/Stars';

export const ShopItem = (props: {
    shopItem: ShopItemDTO,
    isSufficientFundsAvailable: boolean,
    tempIsStartedSwitch?: boolean,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void
} & FlexProps) => {

    const { shopItem, children, isSufficientFundsAvailable, handlePurchaseItem, ...css } = props;
    const { name, coinPrice, canPurchase, purchaseCount, coverFilePath, currencyPrice, shopItemCategoryName } = shopItem;
    const isPurchased = purchaseCount > 0;

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="15px"
        position="relative"
        overflow="hidden"
        shadow={"0 0 10px 1px #CCC"}
        bg="white"
        justifyContent="space-between"
        border={`5px solid ${isPurchased ? "gold" : "white"}`}
        {...css}>

        {/* cover image box */}
        <Box flex="1" position="relative" minH={200} maxH={200}>

            {/* cover image */}
            <img
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: 'absolute',
                    borderRadius: 10
                }}
                src={coverFilePath}
                alt="" />

            {/* purchase overlay  */}
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

                    <Typography
                        className="fontLight"
                        style={{
                            marginRight: "5px",
                        }}>

                        Megvéve!
                    </Typography>

                    <StarsIcon style={{ color: "white" }}></StarsIcon>
                </Flex>

            </Flex>}
        </Box>

        {/* title */}
        <Box flexBasis="80px" zIndex={1}>

            <Flex direction="column" p="10px" >

                {/* category  */}
                <Text as="text" color="grey">
                    {shopItemCategoryName}
                </Text>

                {/* title */}
                <Flex direction="column">
                    <Text as="h6" fontWeight={"bold"} fontSize="large">{name}</Text>
                </Flex>
            </Flex>
        </Box>

        {/* prices */}
        {!isPurchased && <Flex alignItems={"center"} justifyContent={"center"}>
            <Flex alignItems={"center"}>
                <LocalOffer style={{
                    height: 17,
                    transform: "scaleX(-1)"
                }} />

                {/* episto coin price */}
                <Typography style={{ color: isSufficientFundsAvailable ? "var(--deepGreen)" : "var(--mildRed)" }}>
                    {`Ár: ${coinPrice}`}
                </Typography>
                <img
                    style={{
                        width: 20,
                        height: 20,
                        margin: 2
                    }}
                    src={getAssetUrl("/images/epistoCoin.png")} alt={""} />

                {/* currency price
                {currencyPrice && `\xa0 és csak ${currencyPrice}Ft`}*/}
            </Flex>
        </Flex>}

        {/* buttons */}
        <Flex height="45px" margin="5px 5px 5px 5px">

            {/* item details */}
            <EpistoButton
                onClick={() => { }}
                style={{ flex: "1" }}>
                {translatableTexts.shop.description}
            </EpistoButton>

            {/* purcahase item */}
            {canPurchase && <EpistoButton
                onClick={() => handlePurchaseItem(shopItem)}
                variant="colored"
                isDisabled={!isSufficientFundsAvailable}
                style={{ flex: "1", overflowWrap: "break-word" }}>

                {shopItem.courseId
                    ? "Feloldom"
                    : isPurchased
                        ? translatableTexts.shop.buyAgain
                        : translatableTexts.shop.buy}
            </EpistoButton>}
        </Flex>
    </FlexFloat>
}
