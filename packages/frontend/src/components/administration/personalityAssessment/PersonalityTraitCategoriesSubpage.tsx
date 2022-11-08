import Edit from '@mui/icons-material/Edit';
import {applicationRoutes} from '../../../configuration/applicationRoutes';
import {PersonalityTraitCategoryShortDTO} from '@episto/communication';
import {usePersonalityTraitCategories} from '../../../services/api/personalityAssessmentApiService';
import {useNavigation} from '../../../services/core/navigatior';
import {EpistoButton} from '../../controls/EpistoButton';
import {EpistoFont} from '../../controls/EpistoFont';
import {LoadingFrame} from '../../system/LoadingFrame';
import {FlexListItem} from '../../universal/FlexListItem';
import {FlexListTitleSubtitle} from '../../universal/FlexListTitleSubtitle';
import {AdminSubpageHeader} from '../AdminSubpageHeader';
import {Id} from '@episto/commontypes';
import {EpistoFlex2} from '../../controls/EpistoFlex';

export const PersonalityTraitCategoriesSubpage = () => {

    // http
    const { personalityTraitCategories, personalityTraitCategoriesState, personalityTraitCategoriesError } = usePersonalityTraitCategories();

    //util
    const { navigate2 } = useNavigation();

    // state

    // func

    const handleEdit = (traitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean) => {

        navigate2(applicationRoutes.administrationRoute.personalityAssessmentRoute.editTipsRoute, { traitCategoryId, isMax });
    };

    const rowButtons = [
        {
            action: (dto: PersonalityTraitCategoryShortDTO) => handleEdit(dto.id as any, dto.isMax),
            icon: <Edit></Edit>
        }
    ];

    const truncateTo = (num: number, threshold: number) => {

        if (num > threshold)
            num = truncateTo(num - threshold, threshold);

        return num;
    };

    const colors = personalityTraitCategories
        .map(x => x.id)
        .map(id => {

            const seed = id * 31;
            const hue = truncateTo(160 + seed, 240);

            return `hsl(${hue}, 80%, 60%)`;
        });

    return (
        <LoadingFrame
            loadingState={personalityTraitCategoriesState}
            error={personalityTraitCategoriesError}
            className="whall">

            {/* admin header */}
            <AdminSubpageHeader direction="column">

                {personalityTraitCategories
                    .map((personalityTraitCategory, index) => (
                        <FlexListItem
                            key={index}
                            borderLeft={`5px solid ${colors[index]}`}
                            background="white"
                            midContent={(
                                <FlexListTitleSubtitle
                                    title={personalityTraitCategory.title}
                                    subTitle={personalityTraitCategory.label} />
                            )}
                            endContent={<EpistoFlex2
                                align="center"
                                justifyContent={'flex-end'}
                                height="100%"
                                width='165px'
                                px='10px'>

                                <EpistoFont noLineBreak>
                                    Napi tippek:
                                </EpistoFont>

                                <EpistoFont
                                    style={{
                                        margin: '5px',
                                        background: personalityTraitCategory.tipCount > 0 ? 'var(--mildGreen)' : 'var(--mildRed)',
                                        padding: '2px 5px 2px 5px',
                                        borderRadius: '7px'
                                    }}>

                                    {personalityTraitCategory.tipCount}
                                </EpistoFont>

                                {/* go to edit */}
                                {rowButtons
                                    .map((x, index) => (
                                        <EpistoButton
                                            key={index}
                                            variant={'colored'}
                                            onClick={() => x.action(personalityTraitCategory)}
                                            style={{ width: 20, margin: '3px' }}>

                                            {x.icon}
                                        </EpistoButton>
                                    ))}
                            </EpistoFlex2>} />
                    ))}

            </AdminSubpageHeader>
        </LoadingFrame>
    );
};
