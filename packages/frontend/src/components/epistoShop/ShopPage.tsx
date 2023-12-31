import { GridItem } from '@chakra-ui/react';
import { Id } from '@episto/commontypes';
import { ShopItemDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { useCoinBalance } from '../../services/api/coinTransactionsApiService';
import { useShopItemCategories, useShopItems } from '../../services/api/shopApiService';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { EpistoSelect } from '../controls/EpistoSelect';
import { MUI } from '../controls/MUIControls';
import { EpistoConinInfo } from '../EpistoCoinInfo';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { ProfileImage } from '../ProfileImage';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoSearch } from '../universal/EpistoSearch';
import { ShopItem } from './ShopItem';
import { ShopPurchaseConfirmationDialog } from './ShopPurchaseConfirmationDialog';

export const ShopPage = () => {

    // http
    const { shopItems, refetchShopItems } = useShopItems();
    const { shopItemCategories } = useShopItemCategories();
    const { coinBalance, refetchCoinBalance } = useCoinBalance();

    const [categoryFilterId, setCategoryFilterId] = useState<Id<'ShopItemCategory'>>(Id.create<'ShopItemCategory'>(-1));
    const [currentShopItem, setCurrentShopItem] = useState<null | ShopItemDTO>(null);

    const confirmationDilaogLogic = useEpistoDialogLogic('confirm');

    const isLargerThan1400 = Responsivity
        .useIsLargerThan('1400px');

    const filteredItems = shopItems
        .filter(x => x.shopItemCategoryId === categoryFilterId || categoryFilterId === Id.create<'ShopItemCategory'>(-1));

    const hasItems = filteredItems.length > 0;

    useEffect(() => {

        refetchCoinBalance();
    }, []);

    const handlePurchaseItem = (item: ShopItemDTO) => {

        setCurrentShopItem(item);
        confirmationDilaogLogic.openDialog();
        refetchCoinBalance();
    };

    return <>

        {/* confirmation dialog */}
        <ShopPurchaseConfirmationDialog
            dialogLogic={confirmationDilaogLogic}
            shopItem={currentShopItem}
            onSuccessfulPurchase={() => {
                refetchShopItems();
                refetchCoinBalance();
            }} />

        {/* category filters left pane */}
        <LeftPane>

            {/* categories title */}
            <EpistoFont
                fontSize="fontSmall"
                isUppercase
                style={{
                    textAlign: 'left',
                    margin: 10
                }}>

                {translatableTexts.availableCourses.categoriesTitle}
            </EpistoFont>

            {/* categories list */}
            <MUI.ToggleButtonGroup
                style={{
                    flex: 1,
                    textAlign: 'left'
                }}
                orientation={'vertical'}>

                {[{ id: Id.create<'ShopItemCategory'>(-1), name: 'Mutasd mindet' }]
                    .concat(shopItemCategories)
                    .map((category, index) => {

                        return <MUI.ToggleButton
                            selected={categoryFilterId === category.id}
                            value={category}
                            style={{
                                flexDirection: 'row',
                                textAlign: 'left',
                                width: '100%',
                                height: 40,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingLeft: '10px',
                                border: 'none',
                                fontWeight: 500,
                                fontSize: 13
                            }}
                            onClick={() => setCategoryFilterId(category.id)}
                            key={index}>

                            <EpistoFlex2
                                className="roundBorders"
                                boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                padding="3px"
                                height="30px"
                                margin="2px 10px 2px 0px"
                                bgColor="var(--eduptiveYellowGreen)" />

                            {category.name}
                        </MUI.ToggleButton>;
                    })}
            </MUI.ToggleButtonGroup>
        </LeftPane>

        {/* content */}
        <ContentPane>
            <EpistoFlex2
                id="coursesPanelRoot"
                direction="column"
                pb="40px"
                width="100%"
                className="whall"
                minWidth={isLargerThan1400 ? '1060px' : undefined}>

                {/* search */}
                <EpistoFlex2
                    direction="row"
                    align="center"
                    justify="space-between"
                    width="100%"
                    padding="20px 0">

                    {/* user coin balance */}
                    <EpistoFlex2
                        align="center"
                        flex="3"
                        pr="20px"
                        minWidth="300px">
                        <ProfileImage
                            cursor="pointer"
                            className="square50"
                            style={{
                                minWidth: 50
                            }} />

                        <EpistoFont style={{ margin: '0 0 0 10px' }}
                            fontSize="fontSmall">
                            Aktuális EpistoCoin egyenleged:
                        </EpistoFont>

                        <EpistoConinInfo
                            mx='10px' />
                    </EpistoFlex2>

                    {/* search */}
                    <EpistoSearch height="40px"
                        mx="10px"
                        flex="5" />

                    {/* order settings  */}
                    <EpistoSelect
                        selectedValue={translatableTexts.availableCourses.sortOptions.aToZ}
                        noUnselected
                        items={[
                            translatableTexts.availableCourses.sortOptions.aToZ,
                            translatableTexts.availableCourses.sortOptions.zToA,
                            translatableTexts.availableCourses.sortOptions.newToOld,
                            translatableTexts.availableCourses.sortOptions.oldToNew
                        ]}
                        background="var(--transparentWhite70)"
                        getDisplayValue={x => x}
                        getCompareKey={x => x}
                        onSelected={console.log} />
                </EpistoFlex2>

                {/* shop items */}
                {hasItems && <EpistoDiv
                    id="scrollContainer"
                    className="whall">

                    <EpistoGrid
                        auto="fill"
                        gap="10px"
                        minColumnWidth="250px">

                        {filteredItems
                            .map((shopItem, index) => {

                                return <GridItem key={index}>
                                    <ShopItem
                                        shopItem={shopItem}
                                        isSufficientFundsAvailable={coinBalance.coinBalance >= shopItem.coinPrice}
                                        handlePurchaseItem={handlePurchaseItem}
                                        key={index} />
                                </GridItem>;
                            })}
                    </EpistoGrid>
                </EpistoDiv>}

                {!hasItems && <EpistoFlex2 className="whall">
                    <EpistoFont>
                        Ez a kategória még üres, de már dolgozunk a feltöltésén, nézz vissza a közeljövőben!
                    </EpistoFont>
                </EpistoFlex2>}
            </EpistoFlex2>
        </ContentPane>
    </>;
};
