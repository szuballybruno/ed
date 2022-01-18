import { Flex } from "@chakra-ui/react";
import { Delete } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { DailyTipDTO } from "../../../models/shared_models/DailyTipDTO";
import { usePersonalityTraitCategoryDetails } from "../../../services/api/personalityAssessmentApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useIntParam } from "../../../static/frontendHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const PersonalityAssessmentAdminTipsSubpage = () => {

    //util
    const { navigate } = useNavigation();
    const traitCategoryId = useIntParam("traitCategoryId");

    // http 
    const {
        personalityTraitCategoryDetails,
        personalityTraitCategoryDetailsError,
        personalityTraitCategoryDetailsState
    } = usePersonalityTraitCategoryDetails(traitCategoryId);

    // state 

    // func

    const tips = personalityTraitCategoryDetails?.tips ?? [];

    const handleEdit = (traitCategoryId: number) => {

        navigate(applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips, { traitCategoryId })
    }

    const handleDelete = (traitCategoryId: number) => {

        navigate(applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips, { traitCategoryId })
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
                subRouteLabel={""}>

                {tips
                    .map((tip, index) => (
                        <FlexListItem
                            key={index}
                            background="white"
                            midContent={(
                                <FlexListTitleSubtitle
                                    title={`Tipp ${tip.id}`}
                                    subTitle={tip.description.substring(0, 30)} />
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
                                            onClick={() => x.action(tip)}
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