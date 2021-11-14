import {Box, Flex, FlexProps, Text} from "@chakra-ui/react";
import {FlexFloat} from "../universal/FlexFloat";
import React, {ReactNode} from "react";
import {ShopItemShortDTO} from "../../models/shared_models/ShopItemShortDTO";
import {getAssetUrl} from "../../frontendHelpers";
import {LocalOffer} from "@mui/icons-material";

export const ShopItem = (
    props: {
        shopItem: ShopItemShortDTO,
        className?: string,
        children?: ReactNode,
        tempIsStartedSwitch?: boolean,
    } & FlexProps) => {
    const { shopItem, children, ...css } = props;

    const shopItemTitle = shopItem.title
    const shopItemCategory = shopItem.categoryName
    const thumbnailImageUrl = shopItem.thumbnailImageURL
    const shopItemPriceInEpistoCoin = shopItem.priceInEpistoCoin
    const shopItemPriceInHUF = shopItem.priceInHUF

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

                        <img style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 10
                        }} src={thumbnailImageUrl} alt="" />

                        <Flex
                            h="calc(100% - 8px)"
                            width="calc(100% - 8px)"
                            top="4"
                            left="4"
                            position="absolute">

                        </Flex>
                    </Box>
                </Box>

                {/* done overlay */}

            </Box>

            {/* title */}
            <Box flexBasis="80px" zIndex={1}>

                <Flex direction="column" p="10px" >

                    {/* category  */}
                    <Text as="text" color="grey">
                        {shopItemCategory}
                    </Text>

                    {/* title */}
                    <Flex direction="column">
                        <Text as="h6" fontWeight={"bold"} fontSize="large">{shopItemTitle}</Text>
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
                {`Ár: ${shopItemPriceInEpistoCoin}`}
                <img style={{
                    width: 20,
                    height: 20,
                    margin: 2
                }} src={getAssetUrl("/images/epistoCoin.png")} alt={""} />
                {shopItemPriceInHUF !== 0 && `\xa0 és csak ${shopItemPriceInHUF}Ft`}
            </Flex>
        </Flex>
        <Flex direction="column" minH="50px">
            {children}
        </Flex>
    </FlexFloat>
}
