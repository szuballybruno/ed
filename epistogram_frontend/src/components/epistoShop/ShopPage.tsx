import { Box, Flex, GridItem } from "@chakra-ui/react";
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
                    style={{ margin: "40px 20px", textAlign: "center" }}
                    variant={"h4"}>

                    {translatableTexts.availableCourses.categoriesTitle}
                </Typography>

                {/* categories list */}
                <ToggleButtonGroup className={classes.categoriesList} orientation={"vertical"}>
                    {[{ id: -1, name: "Mutasd mindet" }]
                        .concat(shopItemCategories)
                        .map((category, index) => {
                            return <ToggleButton
                                className={classes.categoriesListItem}
                                selected={categoryFilterId === category.id}
                                value={category}
                                style={{
                                    alignItems: "flex-start",
                                    paddingLeft: "30px",
                                }}
                                onClick={() => setCategoryFilterId(category.id)}
                                key={index}>

                                <Typography>
                                    {category.name}
                                </Typography>
                            </ToggleButton>
                        })}
                </ToggleButtonGroup>
            </LeftPanel>

            {/* content */}
            <RightPanel noPadding={true}>
                <Flex id="coursesPanelRoot" direction="column" overflow="hidden" className="whall">

                    {/* search */}
                    <Box id="courseSearchRoot" p="20px" direction="column">

                        {/* upper part */}
                        <EpistoSearch width="100%" />

                        {/* lower part */}
                        <Flex justify="space-between" mt="20px" align="center">

                            {/* user coin balance */}
                            <Flex align="center">
                                <ProfileImage
                                    url={user.avatarUrl}
                                    cursor="pointer"
                                    className="square40" />

                                <Typography style={{ margin: "0 10px 0 10px" }}>
                                    Aktuális EpistoCoin egyenleged:
                                </Typography>

                                <EpistoConinInfo />
                            </Flex>

                            {/* order settings  */}
                            <Select
                                native
                                onChange={() => { }}
                                className={classes.sortFormControl}
                                inputProps={{
                                    name: 'A-Z',
                                    id: 'outlined-age-native-simple',
                                }}
                                style={{
                                    height: "40px"
                                }}>
                                <option value={10}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                                <option value={20}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.newToOld}</option>
                                <option value={30}>{translatableTexts.availableCourses.sortOptions.oldToNew}</option>
                            </Select>
                        </Flex>
                    </Box>

                    {/* shop items */}
                    <Box id="scrollContainer" overflowY="scroll" className="whall" p="10px">
                        <EpistoGrid auto="fit" gap="15" minColumnWidth="300px">
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
