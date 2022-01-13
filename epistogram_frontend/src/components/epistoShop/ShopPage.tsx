import { Box, Flex, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { useCoinBalance } from "../../services/api/coinTransactionsApiService";
import { useShopItemCategories, useShopItems } from "../../services/api/shopApiService";
import { translatableTexts } from "../../static/translatableTexts";
import classes from "../css/courseSearchMain.module.scss";
import { EpistoConinInfo } from "../EpistoCoinInfo";
import { useEpistoDialogLogic } from "../EpistoDialog";
import { ProfileImage } from "../ProfileImage";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../system/MainPanels";
import { EpistoGrid } from "../universal/EpistoGrid";
import { EpistoSearch } from "../universal/EpistoSearch";
import { ShopItem } from "./ShopItem";
import { ShopPurchaseConfirmationDialog } from "./ShopPurchaseConfirmationDialog";

export const ShopPage = () => {

    // http
    const { shopItems, refetchShopItems } = useShopItems();
    const { shopItemCategories } = useShopItemCategories();
    const { coinBalance, refetchCoinBalance } = useCoinBalance();

    const user = useContext(CurrentUserContext)!;

    const [categoryFilterId, setCategoryFilterId] = useState(-1);
    const [currentShopItem, setCurrentShopItem] = useState<null | ShopItemDTO>(null);

    const confirmationDilaogLogic = useEpistoDialogLogic({ defaultCloseButtonType: "top" });

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    const handlePurchaseItem = (item: ShopItemDTO) => {

        setCurrentShopItem(item);
        confirmationDilaogLogic.openDialog();
    }

    return <MainWrapper>

        <ContentWrapper>

            {/* confirmation dialog */}
            <ShopPurchaseConfirmationDialog
                dialogLogic={confirmationDilaogLogic}
                shopItem={currentShopItem}
                onSuccessfulPurchase={() => {
                    refetchShopItems();
                    refetchCoinBalance();
                }} />

            {/* category filters left pane */}
            <LeftPanel direction="column" align="stretch">

                {/* categories title */}
                <Typography
                    variant="overline"
                    style={{
                        textAlign: "left",
                        margin: 10
                    }}>

                    {translatableTexts.availableCourses.categoriesTitle}
                </Typography>

                {/* categories list */}
                <ToggleButtonGroup
                    style={{
                        flex: 1,
                        textAlign: "left"
                    }}
                    orientation={"vertical"}>

                    {[{ id: -1, name: "Mutasd mindet" }]
                        .concat(shopItemCategories)
                        .map((category, index) => {
                            
                            return <ToggleButton
                                className={classes.categoriesListItem}
                                selected={categoryFilterId === category.id}
                                value={category}
                                style={{
                                    flexDirection: "row",
                                    textAlign: "left",
                                    width: "100%",
                                    height: 40,
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    paddingLeft: "10px",
                                    border: "none",
                                    fontWeight: 500,
                                    fontSize: 13
                                }}
                                onClick={() => setCategoryFilterId(category.id)}
                                key={index}>

                                <Flex
                                    className="roundBorders"
                                    boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                    p="3px"
                                    h="30px"
                                    m="2px 10px 2px 0px"
                                    bgColor="var(--epistoTeal)" />

                                {category.name}
                            </ToggleButton>
                        })}
                </ToggleButtonGroup>
            </LeftPanel>

            {/* content */}
            <RightPanel>
                <Flex
                    id="coursesPanelRoot"
                    direction="column"
                    pb="40px"
                    w="100%"
                    minW={isSmallerThan1400 ? "1060px" : undefined}>

                    {/* search */}
                    <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        w="100%"
                        p="20px 0">

                        {/* user coin balance */}
                        <Flex align="center" flex="3" pr="20px" minW="300px">
                            <ProfileImage
                                url={user.avatarUrl}
                                cursor="pointer"
                                className="square50"
                                style={{
                                    minWidth: 50
                                }} />

                            <Typography style={{ margin: "0 0 0 10px" }} fontSize="13px">
                                Aktuális EpistoCoin egyenleged:
                            </Typography>

                            <EpistoConinInfo />
                        </Flex>

                        {/* search */}
                        <EpistoSearch h="40px" mx="10px" flex="5" />

                        {/* order settings  */}
                        <Select
                            native
                            onChange={() => { }}
                            className="roundBorders fontSmall mildShadow"
                            inputProps={{
                                name: 'A-Z',
                                id: 'outlined-age-native-simple',
                            }}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none"
                                }
                            }}
                            style={{
                                background: "var(--transparentWhite70)",
                                border: "none",
                                height: "40px",
                                color: "3F3F3F",
                                flex: 1
                            }}>
                            <option value={10}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                            <option value={20}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                            <option value={30}>{translatableTexts.availableCourses.sortOptions.newToOld}</option>
                            <option value={30}>{translatableTexts.availableCourses.sortOptions.oldToNew}</option>
                        </Select>
                    </Flex>

                    {/* shop items */}
                    <Box
                        id="scrollContainer"
                        className="whall">

                        <EpistoGrid
                            auto="fill"
                            gap="10"
                            minColumnWidth="250px">

                            {shopItems
                                .filter(x => x.shopItemCategoryId === categoryFilterId || categoryFilterId === -1)
                                .map((shopItem, index) => {

                                    return <GridItem>
                                        <ShopItem
                                            shopItem={shopItem}
                                            isSufficientFundsAvailable={coinBalance >= shopItem.coinPrice}
                                            handlePurchaseItem={handlePurchaseItem}
                                            key={index} />
                                    </GridItem>
                                })}
                        </EpistoGrid>
                    </Box>
                </Flex>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}
