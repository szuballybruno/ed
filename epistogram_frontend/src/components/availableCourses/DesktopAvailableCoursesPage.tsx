import { GridItem } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';
import { Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { CourseCategoryDTO } from '../../shared/dtos/CourseCategoryDTO';
import { OrderType } from '../../shared/types/sharedTypes';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../ContentPane';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex, EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { EpistoSearch } from '../controls/EpistoSearch';
import { LeftPane } from '../LeftPane';
import { PageRootContainer } from '../PageRootContainer';
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

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    return <PageRootContainer>

        <LeftPane>

            {/* categories  */}
            <EpistoFlex direction='vertical'>

                {/* categories title */}
                <EpistoFont
                    fontSize="fontExtraSmall"
                    isUppercase
                    style={{ margin: '10px' }}>

                    {translatableTexts.availableCourses.categoriesTitle}
                </EpistoFont>

                {/* categories list */}
                <ToggleButtonGroup
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
                            return <ToggleButton
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
                                    p="3px"
                                    height="30px"
                                    m="2px 10px 2px 0px"
                                    bgColor={filterProps.filterCategoryId === categoryOption.id
                                        ? 'var(--deepBlue)'
                                        : 'var(--epistoTeal)'} />

                                {categoryOption.name}
                            </ToggleButton>;
                        })}
                </ToggleButtonGroup>
            </EpistoFlex>
        </LeftPane>

        <ContentPane noMaxWidth>

            <EpistoFlex2
                id="coursesPanelRoot"
                direction="column"
                align="stretch"
                width="100%"
                minWidth={isSmallerThan1400 ? '1060px' : undefined}>

                {/* search */}
                <EpistoFlex2
                    id="courseSearchRoot"
                    direction="row"
                    align="center"
                    justify="space-between"
                    width="100%"
                    p="0 0 20px 0">

                    {/* toggle buttons */}
                    <ToggleButtonGroup
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
                        <ToggleButton
                            onClick={() => handleSetFilterProp('isRecommended', !filterProps.isRecommended)}
                            selected={filterProps.isRecommended}
                            value="recommended"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.recommendedForYou}
                        </ToggleButton>

                        {/* featured */}
                        <ToggleButton
                            onClick={() => handleSetFilterProp('isFeatured', !filterProps.isFeatured)}
                            selected={filterProps.isFeatured}
                            value="featured"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.highlighted}
                        </ToggleButton>

                        {/* show all */}
                        <ToggleButton
                            onClick={() => clearFilters()}
                            value="showAll"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.all}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <EpistoSearch
                        onChange={(e) => {
                            handleSetFilterProp('searchText', e.currentTarget.value);
                        }}
                        value={filterProps.searchText || ''}
                        flex="5"
                        height="40px"
                        mx="10px" />

                    <Select
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
                    </Select>
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
    </PageRootContainer >;
};