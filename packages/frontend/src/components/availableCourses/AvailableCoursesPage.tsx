import { Id, OrderType } from '@episto/commontypes';
import { AvailableCourseDTO } from '@episto/communication';
import { useState } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { CourseApiService } from '../../services/api/courseApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { useSetBusy } from '../system/LoadingFrame/BusyBarContext';
import { DesktopAvailableCoursesPage } from './DesktopAvailableCoursesPage';
import { MobileAvailableCoursesPage } from './MobileAvailableCoursesPage';

export class AvailableCoursesPageFilterType {
    searchText: string;
    filterCategoryId: Id<'CourseCategory'> | null;
    isFeatured: boolean;
    isRecommended: boolean;
    orderBy: OrderType | null;
}

const AvailableCoursesPage = () => {

    const [filterProps, setFilterProps] = useState<AvailableCoursesPageFilterType>({
        searchText: '',
        filterCategoryId: null,
        isFeatured: false,
        isRecommended: false,
        orderBy: 'nameASC'
    });

    const {
        searchText,
        filterCategoryId,
        isFeatured,
        isRecommended,
        orderBy
    } = filterProps;

    const { isMobile } = Responsivity
        .useIsMobileView();

    const { courses, coursesState, coursesError } = CourseApiService
        .useUserCourses(searchText, filterCategoryId, isFeatured, isRecommended, orderBy);

    const { courseCategories, courseCategoriesState, courseCategoriesError } = CourseApiService
        .useAvailableCourseCategories();

    const { continueCourse, navigateToCourseDetails } = useNavigation();
    const showError = useShowErrorDialog();

    useSetBusy(CourseApiService.useUserCourses, coursesState, coursesError);

    const clearFilters = () => {
        setFilterProps({
            searchText: '',
            filterCategoryId: null,
            isFeatured: false,
            isRecommended: false,
            orderBy: 'nameASC'
        });
    };

    const navigateToDetailsPage = (course: AvailableCourseDTO) => {

        navigateToCourseDetails(course.courseId, course.currentItemCode ?? undefined);
    };

    const handlePlayCourse = async (course: AvailableCourseDTO) => {

        continueCourse(course.courseId, course.stageName, course.currentItemCode);
    };

    const handleSetFilterProp = <TKey extends keyof AvailableCoursesPageFilterType, TValue extends AvailableCoursesPageFilterType[TKey]>(
        key: TKey,
        value: TValue
    ) => {

        setFilterProps(x => {

            return {
                ...x,
                [key]: value
            };
        });
    };

    return isMobile

        ? <MobileAvailableCoursesPage
            courses={courses}
            handlePlayCourse={handlePlayCourse}
            navigateToDetailsPage={navigateToDetailsPage} />

        : <DesktopAvailableCoursesPage
            courseCategories={courseCategories}
            courses={courses}
            filterProps={filterProps}
            handleSetFilterProp={handleSetFilterProp}
            clearFilters={clearFilters}
            navigateToDetailsPage={navigateToDetailsPage}
            handlePlayCourse={handlePlayCourse} />;
};


export default AvailableCoursesPage;
