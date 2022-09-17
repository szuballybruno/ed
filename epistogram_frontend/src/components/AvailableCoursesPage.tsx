import { GridItem, useMediaQuery } from '@chakra-ui/react';
import { Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { CourseApiService } from '../services/api/courseApiService';
import { useNavigation } from '../services/core/navigatior';
import { useShowErrorDialog } from '../services/core/notifications';
import { AvailableCourseDTO } from '../shared/dtos/AvailableCourseDTO';
import { OrderType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { translatableTexts } from '../static/translatableTexts';
import { ContentPane } from './ContentPane';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoDiv } from './controls/EpistoDiv';
import { EpistoFlex, EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoGrid } from './controls/EpistoGrid';
import { LeftPane } from './LeftPane';
import { PageRootContainer } from './PageRootContainer';
import { useSetBusy } from './system/LoadingFrame/BusyBarContext';
import CourseTile from './universal/CourseTile';
import { EpistoSearch } from './universal/EpistoSearch';

const AvailableCoursesPage = () => {

    const [searchText, setSearchText] = React.useState<string | null>(null);
    const [filterCategoryId, setFilterCategoryId] = React.useState<Id<'CourseCategory'> | null>(null);
    const [isFeatured, setIsFeatured] = React.useState(false);
    const [isRecommended, setIsRecommended] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState<OrderType | null>(null);

    const { courses, coursesState, coursesError } = CourseApiService
        .useUserCourses(searchText, filterCategoryId, isFeatured, isRecommended, orderBy);

    const { courseCategories, courseCategoriesState, courseCategoriesError } = CourseApiService
        .useAvailableCourseCategories();

    const { playCourse, navigateToCourseDetails } = useNavigation();
    const showError = useShowErrorDialog();

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');

    useSetBusy(CourseApiService.useUserCourses, coursesState, coursesError);

    const clearFilters = () => {
        setFilterCategoryId(null);
        setSearchText(null);
        setIsFeatured(false);
        setIsRecommended(false);
        setOrderBy(null);
    };

    const navigateToDetailsPage = (course: AvailableCourseDTO) => {

        navigateToCourseDetails(course.courseId, course.currentItemCode ?? undefined);
    };

    const handlePlayCourse = async (course: AvailableCourseDTO) => {

        playCourse(course.courseId, course.stageName, course.currentItemCode);
    };

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
                                    setFilterCategoryId(categoryOption.id);
                                }}
                                key={index}>
                                <EpistoFlex2
                                    className="roundBorders"
                                    boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                                    p="3px"
                                    height="30px"
                                    m="2px 10px 2px 0px"
                                    bgColor={filterCategoryId === categoryOption.id
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
                            onClick={() => setIsRecommended(!isRecommended)}
                            selected={isRecommended}
                            value="recommended"
                            style={{ width: '100%', whiteSpace: 'nowrap', padding: '15px' }}>

                            {translatableTexts.availableCourses.recommendedForYou}
                        </ToggleButton>

                        {/* featured */}
                        <ToggleButton
                            onClick={() => setIsFeatured(!isFeatured)}
                            selected={isFeatured}
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
                            setSearchText(e.currentTarget.value);
                        }}
                        value={searchText || ''}
                        flex="5"
                        height="40px"
                        mx="10px" />

                    <Select
                        native
                        onChange={(e) => {
                            setOrderBy(e.target.value as OrderType | null);
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
                                        course={course}
                                        key={index}>

                                        <EpistoFlex2 mb="10px">

                                            {/* details */}
                                            <EpistoButton
                                                onClick={() => navigateToDetailsPage(course)}
                                                style={{ flex: '1' }}>
                                                {translatableTexts.availableCourses.courseDataSheet}
                                            </EpistoButton>

                                            {/* start course */}
                                            <EpistoButton
                                                onClick={() => handlePlayCourse(course)}
                                                variant="colored"
                                                style={{ flex: '1' }}>

                                                {translatableTexts.availableCourses.startCourse}
                                            </EpistoButton>
                                        </EpistoFlex2>
                                    </CourseTile>
                                </GridItem>;
                            })}
                    </EpistoGrid>
                </EpistoDiv>
            </EpistoFlex2>
        </ContentPane>
    </PageRootContainer >;
};

export default AvailableCoursesPage;
