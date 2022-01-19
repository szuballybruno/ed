import { Flex } from "@chakra-ui/react";
import { Delete } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { DailyTipDTO } from "../../../models/shared_models/DailyTipDTO";
import { useCreateDailyTip, useDeleteDailyTip } from "../../../services/api/dailyTipApiService";
import { usePersonalityTraitCategoryDetails } from "../../../services/api/personalityAssessmentApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { useIntParam } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const PersonalityAssessmentAdminTipsSubpage = () => {

    //util
    const { navigate } = useNavigation();
    const showError = useShowErrorDialog();
    const personalityTraitCategoryId = useIntParam("traitCategoryId");
    const traitCategoryId = useIntParam("traitCategoryId");

    // http 
    const {
        personalityTraitCategoryDetails,
        personalityTraitCategoryDetailsError,
        personalityTraitCategoryDetailsState,
        refetchPersonalityTraitCategoryDetails
    } = usePersonalityTraitCategoryDetails(personalityTraitCategoryId);

    const { deleteDailyTipAsync, deleteDailyTipState } = useDeleteDailyTip();
    const { createDailyTipAsync, createDailyTipState } = useCreateDailyTip();

    // state 

    // func

    const tips = personalityTraitCategoryDetails?.tips ?? [];

    const handleEdit = (dailyTipId: number) => {

        navigate(applicationRoutes.administrationRoute.personalityAssessmentRoute.editTip, { traitCategoryId, dailyTipId })
    }

    const handleAddTip = async () => {

        try {

            await createDailyTipAsync({ personalityTraitCategoryId });
            showNotification("Napi tipp sikeresen hozzaadva.");
            await refetchPersonalityTraitCategoryDetails();
        }
        catch (e) {

            showError(e);
        }
    }

    const handleDelete = async (dailyTipId: number) => {

        try {

            await deleteDailyTipAsync({ dailyTipId });
            showNotification("Napi tipp sikeresen torolve.");
            await refetchPersonalityTraitCategoryDetails();
        }
        catch (e) {

            showError(e);
        }
    }

    const rowButtons = [
        {
            action: (dto: DailyTipDTO) => handleEdit(dto.id),
            icon: <Edit></Edit>
        },
        {
            action: (dto: DailyTipDTO) => handleDelete(dto.id),
            icon: <Delete></Delete>
        }
    ];

    return (
        <LoadingFrame
            loadingState={personalityTraitCategoryDetailsState}
            error={personalityTraitCategoryDetailsError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips
                ]}
                subRouteLabel={personalityTraitCategoryDetails?.title ?? ""}>

                <Flex
                    bg="var(--deepBlue)"
                    align="center"
                    justify="flex-end"
                    className="dividerBorderBottom">

                    <EpistoButton
                        variant="light"
                        onClick={handleAddTip}
                        style={{
                            margin: "10px"
                        }}>

                        Add tip
                    </EpistoButton>
                </Flex>

                {tips
                    .map((tip, index) => (
                        <FlexListItem
                            key={index}
                            background="white"
                            padding="5px"
                            midContent={(
                                <FlexListTitleSubtitle
                                    title={`Tipp ${tip.id}`}
                                    subTitle={tip.description.substring(0, 30)} />
                            )}
                            endContent={<Flex
                                align="center">

                                {/* go to edit */}
                                {rowButtons
                                    .map(x => (
                                        <EpistoButton
                                            variant={"colored"}
                                            onClick={() => x.action(tip)}
                                            className="square30"
                                            style={{
                                                margin: "3px"
                                            }}>

                                            {x.icon}
                                        </EpistoButton>
                                    ))}
                            </Flex>} />
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
}