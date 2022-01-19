import { Flex } from "@chakra-ui/react";
import Edit from "@mui/icons-material/Edit";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { PersonalityTraitCategoryShortDTO } from "../../../models/shared_models/PersonalityTraitCategoryShortDTO";
import { usePersonalityTraitCategories } from "../../../services/api/personalityAssessmentApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { EpistoButton } from "../../controls/EpistoButton";
import { LoadingFrame } from "../../system/LoadingFrame";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const PersonalityAssessmentAdminSubpage = () => {

    // http 
    const { personalityTraitCategories, personalityTraitCategoriesState, personalityTraitCategoriesError } = usePersonalityTraitCategories();

    //util
    const { navigate } = useNavigation();

    // state 

    // func

    const handleEdit = (traitCategoryId: number) => {

        navigate(applicationRoutes.administrationRoute.personalityAssessmentRoute.editTips, { traitCategoryId })
    }

    const rowButtons = [
        {
            action: (dto: PersonalityTraitCategoryShortDTO) => handleEdit(dto.id),
            icon: <Edit></Edit>
        }
    ];

    return (
        <LoadingFrame
            loadingState={personalityTraitCategoriesState}
            error={personalityTraitCategoriesError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader>

                {personalityTraitCategories
                    .map((personalityTraitCategory, index) => (
                        <FlexListItem
                            key={index}
                            background="white"
                            midContent={(
                                <FlexListTitleSubtitle
                                    title={personalityTraitCategory.title}
                                    subTitle={personalityTraitCategory.maxLabel + " / " + personalityTraitCategory.minLabel} />
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
                                            onClick={() => x.action(personalityTraitCategory)}
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