import { Id } from '@episto/commontypes';
import { ShopItemAdminShortDTO } from '@episto/communication';
import { Delete } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useAdminShopItems, useCreateShopItem } from '../../../services/api/shopApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { FlexListItem } from '../../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../../universal/FlexListTitleSubtitle';
import { AdminListEditHeader } from '../AdminListEditHeader';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { useAdminBreadcrumbsContext } from '../breadcrumbsHeader/AdminBreadcrumbsContext';
import { ShopAdminEditSubpage } from './ShopAdminEditSubpage';

export const ShopAdminSubpage = () => {

    // http
    const { adminShopItems, adminShopItemsError, adminShopItemsState } = useAdminShopItems();
    const { createShopItemAsync, createShopItemState } = useCreateShopItem();

    //util
    const { navigate3 } = useNavigation();
    const showError = useShowErrorDialog();
    const { activeCompanyId } = useAdminBreadcrumbsContext();

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

        navigate3(applicationRoutes.administrationRoute.shopRoute.editRoute, { params: { activeCompanyId, shopItemId: id } });
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

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.shopRoute,
                    element: <LoadingFrame
                        loadingState={[adminShopItemsState, createShopItemState]}
                        error={adminShopItemsError}
                        className="whall">

                        {/* admin header */}
                        <AdminSubpageHeader direction="column">
                            <AdminListEditHeader
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
                            <EpistoFlex2
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
                                            isChecked={selectedIds.some(x => x === shopItem.id)}
                                            midContent={(
                                                <FlexListTitleSubtitle
                                                    title={shopItem.name}
                                                    subTitle={shopItem.shopItemCategoryId + ''} />
                                            )}
                                            endContent={<EpistoFlex2
                                                align="center"
                                                justifyContent={'flex-end'}
                                                height="100%"
                                                width='165px'
                                                px='10px'>

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
                                            </EpistoFlex2>} />
                                    ))}
                            </EpistoFlex2>


                        </AdminSubpageHeader>
                    </LoadingFrame>,
                    asIndexRoute: true
                },
                {
                    route: applicationRoutes.administrationRoute.shopRoute.editRoute,
                    element: <ShopAdminEditSubpage />
                }
            ]} />
    );
};
