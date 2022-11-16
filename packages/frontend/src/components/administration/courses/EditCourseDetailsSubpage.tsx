import { useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EMPTY_ARRAY } from '../../../helpers/emptyArray';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification, useShowErrorDialog } from '../../../services/core/notifications';
import { CourseCategoryDTO } from '@episto/communication';
import { CourseDetailsEditDataDTO } from '@episto/communication';
import { CourseVisibilityType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { iterate, useStateObject } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoCheckboxLabel } from '../../controls/EpistoCheckboxLabel';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoImage } from '../../controls/EpistoImage';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoImageSelector } from '../../universal/EpistoImageSelector';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { SimpleEditList } from '../SimpleEditList';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';
import { EditSection } from './EditSection';
import { instantiate, parseIntOrFail } from '@episto/commonlogic';
import { EpistoSlider } from '../../controls/EpistoSlider';

export const EditCourseDetailsSubpage = () => {

    // util
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);
    const isAnySelected = Id.read(courseId) != -1;
    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();

    // http
    const { courseDetailsEditData, courseDetailsEditDataError, courseDetailsEditDataState } = CourseApiService.useCourseDetailsEditData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = CourseApiService.useSaveCourseDetailsData();
    const { saveCourseThumbnailAsync, saveCourseThumbnailState } = CourseApiService.useUploadCourseThumbnailAsync();
    const { deleteCourseAsync, deleteCourseState } = CourseApiService.useDeleteCourse();

    // calc
    const categories = courseDetailsEditData?.categories ?? EMPTY_ARRAY;
    const teachers = courseDetailsEditData?.teachers ?? EMPTY_ARRAY;

    // defaults
    const defaultHumanSkillBenefits = useMemo(() => iterate(10, () => ({
        text: '',
        value: 0
    })), []);

    const defaultSkillBenefits = useMemo(() => [
        'Alapvető műveletek elvégzése',
        'Grafikai elemek használata',
        'Grafikonok és diagramok létrehozása'
    ], []);

    const [{
        title,
        thumbnailSrc,
        thumbnailImageFile,
        category,
        subCategory,
        shortDescription,
        technicalRequirementsDescription,
        description,
        difficulty,
        benchmark,
        prevCompletedCount,
        language,
        visibility,
        teacherId,
        skillBenefits,
        technicalRequirements,
        humanSkillBenefitsDescription,
        humanSkillBenefits,
        isPrequizRequired,
        isPretestRequired
    }, setState, stateObj] = useStateObject({
        title: '',
        thumbnailSrc: '',
        thumbnailImageFile: null as File | null,
        category: null as CourseCategoryDTO | null,
        subCategory: null as CourseCategoryDTO | null,
        shortDescription: '',
        technicalRequirementsDescription: '',
        description: '',
        difficulty: 0,
        benchmark: 0,
        prevCompletedCount: '',
        language: '',
        visibility: 'public' as CourseVisibilityType,
        teacherId: Id.create<'User'>(0),
        skillBenefits: defaultSkillBenefits,
        technicalRequirements: [] as any[],
        humanSkillBenefitsDescription: '',
        humanSkillBenefits: defaultHumanSkillBenefits,
        isPrequizRequired: true,
        isPretestRequired: true
    });

    // func
    const handleSaveCourseAsync = async () => {

        if (!courseDetailsEditData)
            return;

        const dto: CourseDetailsEditDataDTO = {
            courseId: courseId,
            title: title,
            thumbnailURL: thumbnailSrc,
            benchmark: benchmark,
            description: description,
            difficulty: difficulty,
            language: language,
            shortDescription: shortDescription,
            skillBenefits: skillBenefits,
            technicalRequirements: technicalRequirements,
            humanSkillBenefitsDescription: humanSkillBenefitsDescription,
            humanSkillBenefits: humanSkillBenefits,
            visibility: visibility,
            teacherId: teacherId,
            previouslyCompletedCount: parseIntOrFail(prevCompletedCount),
            technicalRequirementsDescription: technicalRequirementsDescription,
            isPrequizRequired,
            isPretestRequired,
            categories: [],
            teachers: [],

            category: {
                id: category?.id!
            } as CourseCategoryDTO,

            subCategory: {
                id: subCategory?.id!
            } as CourseCategoryDTO
        };

        try {

            if (thumbnailImageFile)
                await saveCourseThumbnailAsync(courseId, thumbnailImageFile);

            await saveCourseDataAsync(dto);

            showNotification('Kurzus sikeresen mentve!');
        }
        catch (e) {

            showError(e);
        }
    };

    const handleDeleteCourseAsync = async () => {

        try {

            await deleteCourseAsync({ id: courseId });
            showNotification('Kurzus torolve.');
            navigate2(applicationRoutes.administrationRoute.coursesRoute);
        } catch (e) {

            showError(e);
        }
    };

    // effects
    useEffect(() => {

        if (!courseDetailsEditData)
            return;

        const {
            technicalRequirements,
            thumbnailURL,
            previouslyCompletedCount,
            humanSkillBenefits,
            category,
            ...spreadable
        } = courseDetailsEditData;

        const humanSkillBenefitsOrDefault = humanSkillBenefits.length === 0
            ? defaultHumanSkillBenefits
            : humanSkillBenefits;

        const currentCategory = categories
            .filter(x => x.id === category.id)[0];

        setState(instantiate<typeof stateObj>({
            ...spreadable,
            thumbnailSrc: thumbnailURL,
            prevCompletedCount: previouslyCompletedCount + '',
            technicalRequirements: [],
            thumbnailImageFile: null,
            humanSkillBenefits: humanSkillBenefitsOrDefault,
            category: currentCategory
        }));
    }, [courseDetailsEditData, categories, defaultHumanSkillBenefits, setState]);

    return <LoadingFrame
        loadingState={[saveCourseDataState, deleteCourseState, courseDetailsEditDataState, saveCourseThumbnailState]}
        error={courseDetailsEditDataError}
        direction="column"
        className="whall">

        {/* frame */}
        <CourseAdministartionFrame
            isAnySelected={isAnySelected}>

            {/* admin header */}
            <AdminSubpageHeader
                direction="column"
                pb="20px"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
                ]}
                headerButtons={[
                    {
                        action: handleDeleteCourseAsync,
                        title: 'Torles'
                    },
                    {
                        action: handleSaveCourseAsync,
                        title: 'Mentés',
                        variant: 'colored'
                    }
                ]}>

                {/* Course edit */}
                <EpistoFlex2 direction="row"
                    flex="1">

                    {/* left pane  */}
                    <EpistoFlex2 direction="column"
                        flex="1"
                        mr="5px">

                        {/* Basic info section */}
                        <EditSection
                            title="Alapadatok">

                            {/* Thumbnail image */}
                            <EpistoLabel isOverline
                                text="Borítókép">
                                <EpistoImageSelector
                                    width="192px"
                                    height="108px"
                                    setImageFile={x => setState(s => s.thumbnailImageFile = x)}
                                    setImageSource={x => setState(s => s.thumbnailSrc = x)}>
                                    <EpistoImage className="whall"
                                        objectFit="cover"
                                        src={thumbnailSrc} />
                                </EpistoImageSelector>
                            </EpistoLabel>

                            {/* Title */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                value={title}
                                label="Név"
                                setValue={x => setState(s => s.title = x)} />

                            {/* Language */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                value={language}
                                label="Nyelv"
                                setValue={x => setState(s => s.language = x)} />

                            {/* Main category */}
                            <EpistoLabel
                                isOverline
                                text="Főkategória">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ''}
                                    getDisplayValue={x => x?.name + ''}
                                    items={categories}
                                    selectedValue={category}
                                    onSelected={x => setState(s => s.category = x)} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Alkategória">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ''}
                                    getDisplayValue={x => x?.name + ''}
                                    items={category?.childCategories ?? []}
                                    selectedValue={subCategory}
                                    onSelected={x => setState(s => s.subCategory = x)} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Tanár">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ''}
                                    getDisplayValue={x => x?.fullName + ''}
                                    items={teachers}
                                    selectedValue={teachers.filter(x => x.id === teacherId)[0]}
                                    onSelected={x => setState(state => state.teacherId = x.id)} />
                            </EpistoLabel>

                            {/* is pretest required  */}
                            {/* is prequiz required  */}
                            <EpistoLabel
                                isOverline
                                text='Elozetes tesztek'>

                                <EpistoCheckboxLabel
                                    label="Is pretest required?">

                                    <EpistoCheckbox
                                        value={isPretestRequired}
                                        setValue={x => setState(s => s.isPretestRequired = x)} />
                                </EpistoCheckboxLabel>

                                <EpistoCheckboxLabel
                                    label="Is prequiz required?">

                                    <EpistoCheckbox
                                        value={isPrequizRequired}
                                        setValue={x => setState(s => s.isPrequizRequired = x)} />
                                </EpistoCheckboxLabel>
                            </EpistoLabel>
                        </EditSection>

                        <EditSection title="Jogosultságkezelés">
                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Elérhetőségi szint">

                                <EpistoSelect
                                    getCompareKey={x => x}
                                    getDisplayValue={x => x === 'public' ? 'Publikus' : 'Privat'}
                                    items={['public', 'private'] as CourseVisibilityType[]}
                                    selectedValue={visibility}
                                    onSelected={x => setState(s => s.visibility = x)} />
                            </EpistoLabel>
                        </EditSection>

                        <EditSection title="Tartalmi információk">

                            {/* Short description */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                value={shortDescription}
                                label="Áttekintés"
                                setValue={x => setState(s => s.shortDescription = x)} />

                            {/* Overview description */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                value={description}
                                label="Részletes leírás"
                                setValue={x => setState(s => s.description = x)} />

                            {/* Difficulty */}
                            <EpistoLabel
                                isOverline
                                text="Nehézség">

                                <EpistoSlider
                                    aria-label="Nehézség"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={0.5}
                                    value={difficulty}
                                    onChange={(_, val) => setState(s => s.difficulty = val as number)}
                                    marks
                                    min={0}
                                    max={10} />
                            </EpistoLabel>

                            {/* Benchmark index */}
                            <EpistoLabel
                                isOverline
                                text="Tanulási élmény">

                                <EpistoSlider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    value={benchmark}
                                    step={0.5}
                                    onChange={(_, val) => setState(s => s.benchmark = val as number)}
                                    marks
                                    min={0}
                                    max={5} />
                            </EpistoLabel>



                            {/* previously completed count */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                type="number"
                                value={prevCompletedCount}
                                label="Elvégzések száma"
                                setValue={x => setState(s => s.prevCompletedCount = x)} />

                        </EditSection>
                    </EpistoFlex2>

                    {/* right pane  */}
                    <EpistoFlex2 direction="column"
                        flex="1"
                        ml="5px">

                        <EditSection
                            className="roundBorders"
                            title="Követelmények és ajánlás"
                            style={{
                                marginBottom: 50
                            }}>

                            {/* technical requirtements description */}
                            <EpistoEntry
                                labelVariant={'top'}
                                isMultiline={true}
                                value={technicalRequirementsDescription}
                                label="Technikai ajánlás"
                                setValue={x => setState(s => s.technicalRequirementsDescription = x)} />

                            <SimpleEditList
                                mt="10px"
                                title="Technikai követelmények"
                                items={technicalRequirements}
                                initialValue=""
                                setItems={x => setState(s => s.technicalRequirements = x)} />
                        </EditSection>

                        {/* requirements section */}
                        <EditSection
                            className="roundBorders"
                            title="Előnyök"
                            style={{
                                marginBottom: 50
                            }}>

                            <SimpleEditList
                                mt="10px"
                                title="Elsajátítható technikai ismeretek"
                                items={skillBenefits}
                                initialValue=""
                                setItems={x => setState(s => s.skillBenefits = x)} />
                            {/* skill improvement description */}
                            <EpistoEntry
                                marginTop="30px"
                                labelVariant={'top'}
                                isMultiline={true}
                                value={humanSkillBenefitsDescription}
                                label="Elsajátítható készségek leírása"
                                setValue={x => setState(s => s.humanSkillBenefitsDescription = x)} />
                            <SimpleEditList
                                mt="10px"
                                title="Elsajátítható készségek és azok aránya"
                                items={humanSkillBenefits}
                                initialValue={{ text: '', value: 0 }}
                                setItems={x => setState(s => s.humanSkillBenefits = x)}
                                renderChild={(item, onItemChanged) => (
                                    <EpistoFlex2
                                        flexDir={'row'}
                                        alignItems={'center'}
                                        my='3px'
                                        flex="1">

                                        <EpistoEntry
                                            flex="4"
                                            marginTop={'0'}
                                            labelVariant={'top'}
                                            isMultiline={true}
                                            value={item.text}
                                            setValue={(value) => onItemChanged({ ...item, text: value })} />

                                        <EpistoSlider
                                            defaultValue={0}
                                            valueLabelDisplay="auto"
                                            value={item.value}
                                            onChange={(_, targetValue) => onItemChanged({ ...item, value: targetValue as number })}
                                            style={{
                                                margin: '5px 10px 5px 10px',
                                                flex: 3
                                            }}
                                            step={1}
                                            marks
                                            min={0}
                                            max={10} />
                                    </EpistoFlex2>
                                )} />

                            {/* radar chart */}
                            <EpistoFlex2 mt="30px"
                                minH="300px"
                                align="center"
                                justify="center">
                            </EpistoFlex2>
                        </EditSection>
                    </EpistoFlex2>
                </EpistoFlex2>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >;
};
