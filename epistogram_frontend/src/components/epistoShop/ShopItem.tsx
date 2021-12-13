import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LocalOffer } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { getAssetUrl } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoButton } from "../universal/EpistoButton";
import { FlexFloat } from "../universal/FlexFloat";

export const ShopItem = (props: {
    shopItem: ShopItemDTO,
    isSufficientFundsAvailable: boolean,
    tempIsStartedSwitch?: boolean,
    handlePurchaseItem: (shopItem: ShopItemDTO) => void
} & FlexProps) => {

    const { shopItem, children, isSufficientFundsAvailable, handlePurchaseItem, ...css } = props;
    const { name, coinPrice, coverFilePath, currencyPrice, shopItemCategoryName } = shopItem;

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        bg="white"
        justifyContent="space-between"
        border="5px solid white"
        {...css}>

        {/* image  */}
        <Flex direction={"column"}>
            <Box flex="1" position="relative" minH={200} maxH={200}>
                <Box position="relative"
                    className="whall"
                    minHeight="150px">
                    <Box
                        position="absolute"
                        top="0"
                        height="100%"
                        width="100%"
                        p="4px">

                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 10
                            }}
                            src={coverFilePath}
                            alt="" />

                        <Flex
                            h="calc(100% - 8px)"
                            width="calc(100% - 8px)"
                            top="4"
                            left="4"
                            position="absolute">

                        </Flex>
                    </Box>
                </Box>
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
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"}>
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

                {/* currency price */}
                {currencyPrice && `\xa0 és csak ${currencyPrice}Ft`}
            </Flex>
        </Flex>

        {/* buttons */}
        <Flex height="45px" mt="10px">

            {/* item details */}
            <EpistoButton
                onClick={() => { }}
                style={{ flex: "1" }}>
                {translatableTexts.shop.description}
            </EpistoButton>

            {/* purcahase item */}
            <EpistoButton
                onClick={() => handlePurchaseItem(shopItem)}
                variant="colored"
                isDisabled={!isSufficientFundsAvailable}
                style={{ flex: "1" }}>

                {shopItem.courseId ? "Feloldom" : translatableTexts.shop.buy}
            </EpistoButton>
        </Flex>
    </FlexFloat>
}
