import { GridItem } from '@chakra-ui/layout';
import { OrderType } from '@episto/commontypes';
import { AvailableCourseDTO, CourseCategoryDTO } from '@episto/communication';
import { Responsivity } from '../../helpers/responsivity';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex, EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { EpistoSearch } from '../controls/EpistoSearch';
import { MUI } from '../controls/MUIControls';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { CourseTile } from '../universal/CourseTile';
import { AvailableCoursesPageFilterType } from './AvailableCoursesPage';

export const DesktopAvailableCoursesPage = ({
    courseCategories,
    courses,
    filterProps,
    handleSetFilterProp,
    clearFilters,
    navigateToDetailsPage,
    handlePlayCourse
}: {
    courseCategories: CourseCategoryDTO[],
    courses: AvailableCourseDTO[],
    filterProps: AvailableCoursesPageFilterType,
    handleSetFilterProp: <TKey extends keyof AvailableCoursesPageFilterType, TValue extends AvailableCoursesPageFilterType[TKey]>(
        key: TKey,
        value: TValue
    ) => void,
    clearFilters: () => void,
    navigateToDetailsPage: (course: AvailableCourseDTO) => void,
    handlePlayCourse: (course: AvailableCourseDTO) => void
}) => {

    const isLargerThan1400 = Responsivity
        .useIsLargerThan('1400px');

    return <>

        <LeftPane>

            {/* categories  */}
            <EpistoFlex direction='vertical'>

                {/* categories title */}
                <EpistoFont
                    fontSize="fontSmall"
                    isUppercase
                    style={{ margin: '10px' }}>

                    {translatableTexts.availableCourses.categoriesTitle}
                </EpistoFont>

                {/* categories list */}
                <MUI.ToggleButtonGroup
                    style={{
                        flex: 1,
                        textAlign: 'left'
                    }}
                    orientation={'vertical'}>

                    {courseCategories
                        .sort((a, b) => a.name > b.name
                            ? 1
                            : a.name < b.name
                                ? -1
                                : 0)
                        .map((categoryOption, index) => {
                            return <MUI.ToggleButton
                                value={categoryOption}
                                style={{
                                    textAlign: 'left',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    height: 35,
                                    paddingLeft: '10px',
                                    border: 'none'
                                }}
                                onClick={() => {
                                    handleSetFilterProp('filterCategoryId', categoryOption.id);
                                }}
                                key={index}>
                                <EpistoFlex2
                                    className="roundBorders"
                                    boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                    padding="3px"
                                    height="30px"
                                    margin="2px 10px 2px 0px"
                                    bgColor={filterProps.filterCategoryId === categoryOption.id
                                        ? 'var(--deepBlue)'
                                        : 'var(--epistoTeal)'} />

                                {categoryOption.name}
                            </MUI.ToggleButton>;
                        })}
                </MUI.ToggleButtonGroup>
            </EpistoFlex>
        </LeftPane>

        <ContentPane>

            <EpistoFlex2
                id="coursesPanelRoot"
                direction="column"
                align="stretch"
                width="100%"
                minWidth={isLargerThan1400 ? '1060px' : undefined}>

                {/* search */}
                <EpistoFlex2
                    id="courseSearchRoot"
                    direction="row"
                    align="center"
                    justify="space-between"
                    width="100%"
                    padding="0 0 20px 0">

                    {/* toggle buttons */}
                    <MUI.ToggleButtonGroup
                        className="mildShadow"
                        style={{
                            background: 'var(--transparentWhite70)',
                            height: 40,
                            border: 'none',
                            flex: 2
                        }}
                        sx={{
                            '& .MuiButtonBase-root': {
                                border: 'none'
                            }
                        }}
                        size={'small'}>

                        {/* recommended */}
                        <MUI.ToggleButton
                            onClick={() => handleSetFilterProp('isRecommended', !filterProps.isRecommended)}
                            selected={filterProps.isRecommended}
                            value="recommended"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.recommendedForYou}
                        </MUI.ToggleButton>

                        {/* featured */}
                        <MUI.ToggleButton
                            onClick={() => handleSetFilterProp('isFeatured', !filterProps.isFeatured)}
                            selected={filterProps.isFeatured}
                            value="featured"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.highlighted}
                        </MUI.ToggleButton>

                        {/* show all */}
                        <MUI.ToggleButton
                            onClick={() => clearFilters()}
                            value="showAll"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.all}
                        </MUI.ToggleButton>
                    </MUI.ToggleButtonGroup>

                    <EpistoFlex2
                        flex='5'
                        mx='5px'>

                        <EpistoSearch
                            onChange={(e) => {
                                handleSetFilterProp('searchText', e.currentTarget.value);
                            }}
                            value={filterProps.searchText || ''}
                            flex="1" />
                    </EpistoFlex2>

                    <MUI.Select
                        native
                        onChange={(e) => {
                            handleSetFilterProp('orderBy', e.target.value as OrderType);
                        }}
                        className="roundBorders fontSmall mildShadow"
                        inputProps={{
                            name: 'A-Z',
                            id: 'outlined-age-native-simple',
                        }}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                        style={{
                            background: 'var(--transparentWhite70)',
                            border: 'none',
                            height: '40px',
                            minWidth: 200,
                            color: '3F3F3F',
                            flex: 1
                        }}>
                        <option value={'nameASC'}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                        <option value={'nameDESC'}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                    </MUI.Select>
                </EpistoFlex2>

                <EpistoDiv id="scrollContainer"
                    className="whall">

                    <EpistoGrid auto="fill"
                        gap='15px'
                        minColumnWidth="250px">

                        {courses
                            .map((course, index) => {

                                return <GridItem
                                    key={index}
                                    className="roundBorders"
                                    background="var(--transparentWhite70)">

                                    <CourseTile
                                        onDetails={() => navigateToDetailsPage(course)}
                                        onPlay={() => handlePlayCourse(course)}
                                        course={course}
                                        key={index} />
                                </GridItem>;
                            })}
                    </EpistoGrid>
                </EpistoDiv>
            </EpistoFlex2>
        </ContentPane>
    </ >;
};