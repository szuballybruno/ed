import { Flex } from "@chakra-ui/react";
import { useAdminShopItems } from "../../../services/api/shopApiService";
import { LoadingFrame } from "../../system/LoadingFrame";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const ShopAdminSubpage = () => {

    const { adminShopItems, adminShopItemsError, adminShopItemsState } = useAdminShopItems();

    return (
        <LoadingFrame
            loadingState={adminShopItemsState}
            error={adminShopItemsError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader>
                {/* <AdminListEditHeader
                    headerButtons={headerButtons}
                    isAllSelected={isAllUsersSelected}
                    selectAllOrNone={selectAllOrNone}
                    selectedIds={selectedUserIds}
                    onSearchChanged={handleSearch}
                    itemLabel="felhasználó" /> */}

                {adminShopItems
                    .map(shopItem => <Flex>{shopItem.name}</Flex>)}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
}