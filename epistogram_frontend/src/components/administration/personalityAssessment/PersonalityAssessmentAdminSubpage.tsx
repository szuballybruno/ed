import { Flex } from "@chakra-ui/react";
import Edit from "@mui/icons-material/Edit";
import { useState } from "react";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ShopItemAdminShortDTO } from "../../../models/shared_models/ShopItemAdminShortDTO";
import { useAdminShopItems, useCreateShopItem } from "../../../services/api/shopApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { EpistoButton } from "../../controls/EpistoButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { AdminListEditHeader } from "../AdminListEditHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const PersonalityAssessmentAdminSubpage = () => {

    // http 
    const { adminShopItems, adminShopItemsError, adminShopItemsState } = useAdminShopItems();
    const { createShopItemAsync, createShopItemState } = useCreateShopItem();

    //util
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();

    // state 
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const isAllSelected = !adminShopItems.some(si => !selectedIds.some(id => id === si.id));

    // func

    const handleEdit = (id: number) => {

    }

    const rowButtons = [
        {
            action: (shopItem: ShopItemAdminShortDTO) => handleEdit(shopItem.id),
            icon: <Edit></Edit>
        }
    ];

    return (
        <LoadingFrame
            loadingState={[adminShopItemsState, createShopItemState]}
            error={adminShopItemsError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader>

                {adminShopItems
                    .map((shopItem, index) => (
                        <FlexListItem
                            key={index}
                            thumbnailContent={(
                                <img
                                    style={{
                                        objectFit: "cover"
                                    }}
                                    src={shopItem.coverFilePath}
                                    className="square70"
                                    alt="shop item cover" />
                            )}
                            background="white"
                            isChecked={selectedIds.some(x => x === shopItem.id)}
                            midContent={(
                                <FlexListTitleSubtitle
                                    title={shopItem.name}
                                    subTitle={shopItem.shopItemCategoryId + ""} />
                            )}
                            endContent={<Flex
                                align="center"
                                justifyContent={"flex-end"}
                                height="100%"
                                width={165}
                                px={10}>

                                {/* go to edit */}
                                {rowButtons
                                    .map(x => (
                                        <EpistoButton
                                            variant={"colored"}
                                            onClick={() => x.action(shopItem)}
                                            style={{ width: 20, margin: "3px" }}>

                                            {x.icon}
                                        </EpistoButton>
                                    ))}
                            </Flex>} />
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
}