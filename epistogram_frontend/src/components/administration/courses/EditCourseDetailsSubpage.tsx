import { Flex, Image } from "@chakra-ui/react";
import { Button, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { ButtonType } from "../../../models/types";
import { useCourseDetailsEditData, useCreateCourse, useSaveCourseDetailsData, useUploadCourseThumbnailAsync } from "../../../services/api/courseApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { CourseCategoryDTO } from "../../../shared/dtos/CourseCategoryDTO";
import { CourseDetailsEditDataDTO } from "../../../shared/dtos/CourseDetailsEditDataDTO";
import { HumanSkillBenefitDTO } from "../../../shared/dtos/HumanSkillBenefitDTO";
import { CourseVisibilityType } from "../../../shared/types/sharedTypes";
import { defaultCharts } from "../../../static/defaultChartOptions";
import { iterate } from "../../../static/frontendHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { EpistoSelect } from "../../controls/EpistoSelect";
import { LoadingFrame } from "../../system/LoadingFrame";
import { EpistoRadarChart } from "../../universal/charts/base_charts/EpistoRadarChart";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { SimpleEditList } from "../SimpleEditList";
import { CourseAdministartionFrame } from "./CourseAdministartionFrame";
import { EditSection } from "./EditSection";

export const AdminCourseDetailsSubpage = () => {

    // util
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const showError = useShowErrorDialog();

    // http
    const { courseDetailsEditData, courseDetailsEditDataError, courseDetailsEditDataState } = useCourseDetailsEditData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseDetailsData();
    const { createCourseAsync, createCourseState } = useCreateCourse();
    const { saveCourseThumbnailAsync, saveCourseThumbnailState } = useUploadCourseThumbnailAsync();

    const categories = courseDetailsEditData?.categories ?? [];
    const teachers = courseDetailsEditData?.teachers ?? [];

    const [title, setTitle] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);
    const [shortDescription, setShortDescription] = useState("");
    const [technicalRequirementsDescription, setTechnicalRequirementsDescription] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [benchmark, setBenchmark] = useState(0);
    const [prevCompletedCount, setPrevCompletedCount] = useState("");
    const [language, setLanguage] = useState("");
    const [visibility, setVisibility] = useState<CourseVisibilityType>("public");
    const [teacherId, setTeacherId] = useState(0);
    const [skillBenefits, setSkillBenefits] = useState<string[]>([
        "Alapvető műveletek elvégzése",
        "Grafikai elemek használata",
        "Grafikonok és diagramok létrehozása"
    ]);
    const [technicalRequirements, setTechnicalRequirements] = useState<string[]>([]);
    const [humanSkillBenefitsDescription, setHumanSkillBenefitsDescription] = useState("");
    const [humanSkillBenefits, setHumanSkillBenefits] = useState<HumanSkillBenefitDTO[]>(iterate(10, () => ({
        text: "",
        value: 0
    })));

    const { navigate } = useNavigation();

    const administrationRoutes = applicationRoutes.administrationRoute;

    const handleSaveCourseAsync = async () => {

        if (!courseDetailsEditData)
            return;

        const dto = {
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
            previouslyCompletedCount: parseInt(prevCompletedCount),
            technicalRequirementsDescription: technicalRequirementsDescription,

            category: {
                id: category?.id!
            },

            subCategory: {
                id: subCategory?.id!
            }
        } as CourseDetailsEditDataDTO;

        try {

            if (thumbnailImageFile)
                await saveCourseThumbnailAsync(courseId, thumbnailImageFile);

            await saveCourseDataAsync(dto);

            showNotification("Kurzus sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    // const handleCreateCourseAsync = async () => {

    //     try {

    //         await createCourseAsync({
    //             title: "Uj kurzus"
    //         });

    //         showNotification("Uj kurzus sikeresen letrehozva!");

    //         await refetchCoursesFunction();
    //     }
    //     catch (e) {

    //         showError(e);
    //     }
    // }

    // effects 
    useEffect(() => {

        if (!courseDetailsEditData)
            return;

        const currentCategory = categories
            .filter(x => x.id === courseDetailsEditData.category.id)[0];

        setTitle(courseDetailsEditData.title);
        setThumbnailSrc(courseDetailsEditData.thumbnailURL);
        setCategory(currentCategory);
        setSubCategory(courseDetailsEditData.subCategory);
        setShortDescription(courseDetailsEditData.shortDescription);
        setDescription(courseDetailsEditData.description);
        setDifficulty(courseDetailsEditData.difficulty);
        setBenchmark(courseDetailsEditData.benchmark);
        setLanguage(courseDetailsEditData.language);
        setVisibility(courseDetailsEditData.visibility);
        setTeacherId(courseDetailsEditData.teacherId);
        setHumanSkillBenefitsDescription(courseDetailsEditData.humanSkillBenefitsDescription);
        setSkillBenefits(courseDetailsEditData.skillBenefits);
        setTechnicalRequirements(courseDetailsEditData.technicalRequirements);
        courseDetailsEditData.humanSkillBenefits.length === 0
            ? iterate(10, () => ({
                text: "",
                value: 0
            }))
            : setHumanSkillBenefits(courseDetailsEditData.humanSkillBenefits)
        setPrevCompletedCount(courseDetailsEditData.previouslyCompletedCount + "");
        setTechnicalRequirementsDescription(courseDetailsEditData.technicalRequirementsDescription + "");

    }, [courseDetailsEditData]);

    const bulkEditButtons = [
        // {
        //     title: "Hozzáadás",
        //     icon: <Add style={{ margin: "0 3px 0 0", padding: "0 0 1px 0" }} />,
        //     action: () => handleCreateCourseAsync()
        // }
    ] as ButtonType[]

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseDetailsEditDataState, saveCourseThumbnailState]}
        error={courseDetailsEditDataError}
        direction="column"
        className="whall">

        {/* frame */}
        <CourseAdministartionFrame>

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
                headerButtons={bulkEditButtons}>

                {/* Course edit */}
                <Flex direction="row" flex="1">

                    {/* left pane  */}
                    <Flex direction="column" flex="1" mr="5px">

                        {/* Basic info section */}
                        <EditSection
                            isFirst
                            title="Alapadatok">

                            {/* Thumbnail image */}
                            <EpistoLabel isOverline text="Borítókép">
                                <SelectImage
                                    width="192px"
                                    height="108px"
                                    setImageFile={setThumbnailImageFile}
                                    setImageSource={setThumbnailSrc}>
                                    <Image className="whall" objectFit="cover" src={thumbnailSrc} />
                                </SelectImage>
                            </EpistoLabel>

                            {/* Title */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={title}
                                label="Név"
                                setValue={setTitle} />

                            {/* Language */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={language}
                                label="Nyelv"
                                setValue={setLanguage} />

                            {/* Main category */}
                            <EpistoLabel
                                isOverline
                                text="Főkategória">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.name + ""}
                                    items={categories}
                                    selectedValue={category}
                                    onSelected={setCategory} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Alkategória">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.name + ""}
                                    items={category?.childCategories ?? []}
                                    selectedValue={subCategory}
                                    onSelected={setSubCategory} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Tanár">

                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.fullName + ""}
                                    items={teachers}
                                    selectedValue={teachers.filter(x => x.id === teacherId)[0]}
                                    onSelected={x => setTeacherId(x.id)} />
                            </EpistoLabel>
                        </EditSection>

                        <EditSection title="Jogosultságkezelés">
                            {/* Subcategory */}
                            <EpistoLabel
                                isOverline
                                text="Elérhetőségi szint">

                                <EpistoSelect
                                    getCompareKey={x => x}
                                    getDisplayValue={x => x === "public" ? "Publikus" : "Privat"}
                                    items={["public", "private"] as CourseVisibilityType[]}
                                    selectedValue={visibility}
                                    onSelected={setVisibility} />
                            </EpistoLabel>
                        </EditSection>

                        <EditSection title="Tartalmi információk">

                            {/* Short description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={shortDescription}
                                label="Áttekintés"
                                setValue={setShortDescription} />

                            {/* Overview description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={description}
                                label="Részletes leírás"
                                setValue={setDescription} />

                            {/* Difficulty */}
                            <EpistoLabel
                                isOverline
                                text="Nehézség">

                                <Slider
                                    aria-label="Nehézség"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={0.5}
                                    value={difficulty}
                                    onChange={(_, val) => setDifficulty(val as number)}
                                    marks
                                    min={0}
                                    max={10} />
                            </EpistoLabel>

                            {/* Benchmark index */}
                            <EpistoLabel
                                isOverline
                                text="Tanulási élmény">

                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    value={benchmark}
                                    step={0.5}
                                    onChange={(_, val) => setBenchmark(val as number)}
                                    marks
                                    min={0}
                                    max={5} />
                            </EpistoLabel>



                            {/* previously completed count */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                type="number"
                                value={prevCompletedCount}
                                label="Elvégzések száma"
                                setValue={setPrevCompletedCount} />

                        </EditSection>
                    </Flex>

                    {/* right pane  */}
                    <Flex direction="column" flex="1" ml="5px">

                        <EditSection
                            isFirst
                            className="roundBorders"
                            title="Követelmények és ajánlás"
                            style={{
                                marginBottom: 50
                            }}>

                            {/* technical requirtements description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={technicalRequirementsDescription}
                                label="Technikai ajánlás"
                                setValue={setTechnicalRequirementsDescription} />

                            <SimpleEditList
                                mt="10px"
                                title="Technikai követelmények"
                                items={technicalRequirements}
                                initialValue=""
                                setItems={setTechnicalRequirements} />
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
                                setItems={setSkillBenefits} />
                            {/* skill improvement description */}
                            <EpistoEntry
                                marginTop="30px"
                                labelVariant={"top"}
                                isMultiline={true}
                                value={humanSkillBenefitsDescription}
                                label="Elsajátítható készségek leírása"
                                setValue={setHumanSkillBenefitsDescription} />
                            <SimpleEditList
                                mt="10px"
                                title="Elsajátítható készségek és azok aránya"
                                items={humanSkillBenefits}
                                initialValue={{ text: "", value: 0 }}
                                setItems={x => setHumanSkillBenefits(x)}
                                renderChild={(item, onItemChanged) => (
                                    <Flex
                                        flexDir={"row"}
                                        alignItems={"center"}
                                        my={3}
                                        flex="1">

                                        <EpistoEntry
                                            flex="4"
                                            marginTop={"0"}
                                            labelVariant={"top"}
                                            isMultiline={true}
                                            value={item.text}
                                            setValue={(value) => onItemChanged({ ...item, text: value })} />

                                        <Slider
                                            defaultValue={0}
                                            valueLabelDisplay="auto"
                                            value={item.value}
                                            onChange={(_, targetValue) => onItemChanged({ ...item, value: targetValue as number })}
                                            style={{
                                                margin: "5px 10px 5px 10px",
                                                flex: 3
                                            }}
                                            step={1}
                                            marks
                                            min={0}
                                            max={10} />
                                    </Flex>
                                )} />
                            {/* radar chart */}
                            <Flex mt="30px" minH="300px" align="center" justify="center">
                                <EpistoRadarChart
                                    title=""
                                    areas={[{
                                        name: "Készségek",
                                        value: humanSkillBenefits.map(x => x.value)
                                    }]}
                                    radarIndicators={humanSkillBenefits.map(x => ({
                                        name: x.text,
                                        color: "black",
                                        max: 10
                                    }))}
                                    options={defaultCharts.radar}
                                    style={{
                                        width: "400px",
                                        height: "300px"
                                    }} />
                            </Flex>
                        </EditSection>
                    </Flex>
                </Flex>
                {/* submit button */}
                <Button
                    variant="contained"
                    color={"secondary"}
                    onClick={() => {
                        handleSaveCourseAsync()
                    }}
                    style={{ margin: "20px 20px 0 20px" }}>

                    {translatableTexts.misc.save}
                </Button>

                {/* remove button */}
                <Button
                    variant={"outlined"}
                    color={"error"}
                    onClick={() => {

                        /* if (showDeleteUserDialog) {
    
                            showDeleteUserDialog(editDTO)
                        } else {
    
                            history.goBack()
                        } */
                    }}
                    style={{ margin: "20px 20px 0 20px" }}>

                    {translatableTexts.misc.remove}
                </Button>
            </AdminSubpageHeader>
        </CourseAdministartionFrame>
    </LoadingFrame >
}
