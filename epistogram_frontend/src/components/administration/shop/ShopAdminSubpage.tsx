import { Flex } from '@chakra-ui/react';
import { Delete } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ShopItemAdminShortDTO } from '../../../shared/dtos/ShopItemAdminShortDTO';
import { useAdminShopItems, useCreateShopItem } from '../../../services/api/shopApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { EpistoButton } from '../../controls/EpistoButton';
import { LoadingFrame } from '../../system/LoadingFrame';
import { FlexListItem } from '../../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../../universal/FlexListTitleSubtitle';
import { AdminListEditHeader } from '../AdminListEditHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { ShopAdminEditSubpage } from './ShopAdminEditSubpage';
import { useRedirectOnExactMatch } from '../../../static/frontendHelpers';
import { Id } from '../../../shared/types/versionId';

export const ShopAdminSubpage = () => {

    // http 
    const { adminShopItems, adminShopItemsError, adminShopItemsState } = useAdminShopItems();
    const { createShopItemAsync, createShopItemState } = useCreateShopItem();

    //util
    const { navigate2 } = useNavigation();
    const showError = useShowErrorDialog();

    // state 
    const [selectedIds, setSelectedIds] = useState<Id<'ShopItem'>[]>([]);
    const isAllSelected = !adminShopItems.some(si => !selectedIds.some(id => id === si.id));

    // func
    const selectAllOrNone = (isAll: boolean) => {

        if (isAll) {

            setSelectedIds(adminShopItems.map(x => x.id));
        } else {

            setSelectedIds([]);
        }
    };

    const handleEdit = (id: Id<'ShopItem'>) => {

        navigate2(applicationRoutes.administrationRoute.shopRoute.editRoute, { shopItemId: id });
    };

    const handleDelete = (id: Id<'ShopItem'>) => {

        throw new Error('Not implemented!');
    };

    const handleAddNewAsync = async () => {

        try {

            const shopItemId = await createShopItemAsync();
            showNotification('Uj shop item hozzaadva');
            handleEdit(shopItemId);
        }
        catch (e) {

            showError(e);
        }
    };

    const headerButtons = [
        {
            name: 'editButton',
            text: 'Szerkesztés',
            onClick: () => handleEdit(selectedIds[0])
        },
        {
            name: 'deleteButton',
            text: 'Törlés',
            onClick: () => handleDelete(selectedIds[0])
        }
    ];

    const setSelected = (shopItemId: Id<'ShopItem'>, isSelected: boolean) => {

        if (isSelected) {

            setSelectedIds([...selectedIds, shopItemId]);
        }
        else {

            setSelectedIds(selectedIds.filter(x => x !== shopItemId));
        }
    };

    const rowButtons = [
        {
            action: (shopItem: ShopItemAdminShortDTO) => handleEdit(shopItem.id),
            icon: <Edit></Edit>
        },
        {
            action: (shopItem: ShopItemAdminShortDTO) => handleDelete(shopItem.id),
            icon: <Delete></Delete>
        }
    ];

    useRedirectOnExactMatch({
        route: applicationRoutes.administrationRoute.shopRoute,
        redirectRoute: applicationRoutes.administrationRoute.shopRoute.overviewRoute,
    });

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.shopRoute.overviewRoute,
                    element: <LoadingFrame
                        loadingState={[adminShopItemsState, createShopItemState]}
                        error={adminShopItemsError}
                        className="whall">

                        {/* admin header */}
                        <AdminSubpageHeader direction="column">
                            <AdminListEditHeader
                                headerButtons={headerButtons}
                                isAllSelected={isAllSelected}
                                selectAllOrNone={selectAllOrNone}
                                selectedIds={selectedIds}
                                itemLabel="shop item"
                                buttons={[
                                    {
                                        title: 'Hozzáadás',
                                        action: () => handleAddNewAsync()
                                    }
                                ]} />
                            <Flex
                                mt="5px"
                                borderRadius="5px"
                                background="var(--transparentWhite70)"
                                direction="column">

                                {adminShopItems
                                    .map((shopItem, index) => (
                                        <FlexListItem
                                            key={index}
                                            thumbnailContent={(
                                                <img
                                                    style={{
                                                        objectFit: 'cover'
                                                    }}
                                                    src={shopItem.coverFilePath}
                                                    className="square70"
                                                    alt="shop item cover" />
                                            )}
                                            setIsChecked={x => setSelected(shopItem.id, x)}
                                            isChecked={selectedIds.some(x => x === shopItem.id)}
                                            midContent={(
                                                <FlexListTitleSubtitle
                                                    title={shopItem.name}
                                                    subTitle={shopItem.shopItemCategoryId + ''} />
                                            )}
                                            endContent={<Flex
                                                align="center"
                                                justifyContent={'flex-end'}
                                                height="100%"
                                                width={165}
                                                px={10}>

                                                {/* go to edit */}
                                                {rowButtons
                                                    .map((x, i) => (
                                                        <EpistoButton
                                                            key={i}
                                                            variant={'colored'}
                                                            onClick={() => x.action(shopItem)}
                                                            style={{ width: 20, margin: '3px' }}>

                                                            {x.icon}
                                                        </EpistoButton>
                                                    ))}
                                            </Flex>} />
                                    ))}
                            </Flex>


                        </AdminSubpageHeader>
                    </LoadingFrame>
                },
                {
                    route: applicationRoutes.administrationRoute.shopRoute.editRoute,
                    element: <ShopAdminEditSubpage />
                }
            ]} />
    );
};