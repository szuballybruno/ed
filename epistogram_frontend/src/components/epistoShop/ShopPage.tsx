import { Box, Flex, GridItem } from "@chakra-ui/react";
import { Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { distinct } from "../../static/frontendHelpers";
import { mockShopCategories } from "../../static/mockData";
import { translatableTexts } from "../../static/translatableTexts";
import classes from "../css/courseSearchMain.module.scss";
import { EpistoConinInfo } from "../EpistoCoinInfo";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../system/MainPanels";
import Navbar from "../navbar/Navbar";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoGrid } from "../universal/EpistoGrid";
import { EpistoSearch } from "../universal/EpistoSearch";
import { ShopItem } from "./ShopItem";
import { useShopItems } from "../../services/api/shopService";

export const ShopPage = () => {

    // http
    const { shopItems } = useShopItems();

    const [searchCategory, setSearchCategory] = useState("")

    const categoryOptions = distinct(mockShopCategories
        .map((shopCategory, index) => shopCategory.name)
    )

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            {/* filters */}
            <LeftPanel direction="column" align="stretch">

                {/* categories  */}
                <Flex direction="column">

                    {/* categories title */}
                    <Typography
                        style={{ margin: "40px 20px", textAlign: "center" }}
                        variant={"h4"}>

                        {translatableTexts.availableCourses.categoriesTitle}
                    </Typography>

                    {/* categories list */}
                    <ToggleButtonGroup className={classes.categoriesList} orientation={"vertical"}>
                        {categoryOptions
                            .map((categoryOption, index) => {
                                return <ToggleButton
                                    className={searchCategory === categoryOption ? `${classes.categoriesListItem} ${classes.categoriesListItemSelected}` : `${classes.categoriesListItem}`}
                                    value={categoryOption}
                                    style={{
                                        alignItems: "flex-start",
                                        paddingLeft: "30px",
                                    }}
                                    onClick={() => {
                                        setSearchCategory(categoryOption)
                                    }}
                                    key={index}>
                                    {categoryOption}
                                </ToggleButton>
                            })}
                    </ToggleButtonGroup>
                </Flex>
            </LeftPanel>

            {/* content */}
            <RightPanel noPadding={true}>
                <Flex id="coursesPanelRoot" direction="column" overflow="hidden" className="whall">

                    {/* search */}
                    <Box id="courseSearchRoot" p="20px" direction="column">

                        <EpistoSearch width="100%" />

                        <Flex justify="space-between" mt="20px" align="center">
                            <EpistoConinInfo />

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
                                .map((shopItem, index) => {

                                    return <GridItem>
                                        <ShopItem shopItem={shopItem} key={index} >
                                            <Flex mt="10px">

                                                {/* details */}
                                                <EpistoButton
                                                    onClick={() => { }}
                                                    style={{ flex: "1" }}>
                                                    {translatableTexts.shop.description}
                                                </EpistoButton>

                                                {/* start course */}
                                                <EpistoButton
                                                    onClick={() => { }}
                                                    variant="colored"
                                                    style={{ flex: "1" }}>

                                                    {translatableTexts.shop.buy}
                                                </EpistoButton>
                                            </Flex>
                                        </ShopItem>
                                    </GridItem>
                                })}
                        </EpistoGrid>
                    </Box>
                </Flex>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper >
}