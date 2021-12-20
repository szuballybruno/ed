import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { CourseDetailsEditDataDTO } from "../../../models/shared_models/CourseDetailsEditDataDTO";
import { CourseImprovementStatDTO } from "../../../models/shared_models/CourseImprovementStatDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import { useCourseDetailsEditData, useSaveCourseDetailsData, useUploadCourseThumbnailAsync } from "../../../services/api/courseApiService";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { iterate } from "../../../static/frontendHelpers";
import { LoadingFrame } from "../../system/LoadingFrame";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoSelect } from "../../universal/EpistoSelect";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { CourseImprovementStatsRadar } from "./CourseImprovementStatsRadar";
import { EditSection } from "./EditSection";
import { SimpleEditList } from "./SimpleEditList";

const EpistoLabel = (props: { text: string } & FlexProps) => {

    const { text, ...css } = props;

    return <Flex mt="10px" direction="column" {...css}>
        <Typography
            variant={"overline"}>

            {text}
        </Typography>

        {props.children}
    </Flex>
}

export const AdminCourseDetailsSubpage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const showError = useShowErrorDialog();

    // api calls
    const { courseDetailsEditData, courseDetailsEditDataError, courseDetailsEditDataState } = useCourseDetailsEditData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseDetailsData();
    const { saveCourseThumbnailAsync, saveCourseThumbnailState } = useUploadCourseThumbnailAsync();

    const categories = courseDetailsEditData?.categories ?? [];

    const [title, setTitle] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [benchmark, setBenchmark] = useState(0);
    const [language, setLanguage] = useState("");
    const [skillImprovementDescription, setSkillImprovementDescription] = useState("");
    const [technicalBenefits, setTechnicalBenefits] = useState<string[]>([
        "Alapvető műveletek elvégzése",
        "Grafikai elemek használata",
        "Grafikonok és diagramok létrehozása"
    ]);
    const [technicalRequirements, setTechnicalRequirements] = useState<string[]>([]);

    // functions 
    const [courseImprovementStats, setCourseImprovementStats] = useState<CourseImprovementStatDTO[]>(iterate(10, () => ({
        text: "",
        value: 0
    })));

    const setCourseImprovementStatValue = (index: number, text?: string, value?: number) => {

        const newStats = [...courseImprovementStats];

        if (text !== undefined)
            newStats[index].text = text;

        if (value !== undefined)
            newStats[index].value = value;

        setCourseImprovementStats(newStats);
    }

    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    const handleSaveCourseAsync = async () => {

        if (!courseDetailsEditData)
            return;

        const dto = {
            courseId: courseId,
            title: title,
            thumbnailURL: thumbnailSrc,

            teacher: {
                id: 1,
            } as UserDTO,

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
        setSkillImprovementDescription("");
        setTechnicalBenefits([]);
        setTechnicalRequirements([]);

    }, [courseDetailsEditData]);

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseDetailsEditDataState, saveCourseThumbnailState]}
        error={courseDetailsEditDataError}
        className="whall">
        <Flex flex="1" direction="column" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
                ]}
                onSave={handleSaveCourseAsync}>

                {/* Course edit */}
                <Flex bgColor="#f9f9f9" direction="row">

                    {/* left pane  */}
                    <Flex direction="column" flex="1" mr="5px" ml="10px">

                        {/* details section */}
                        <EditSection title="Alapadatok">

                            <EpistoLabel text="Borítókép">
                                <SelectImage
                                    width="300px"
                                    height="200px"
                                    onImageSelected={setBrowsedImage}>
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

                            {/* Short description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={shortDescription}
                                label="Rövid leírás"
                                setValue={setShortDescription} />

                            {/* Overview description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={description}
                                label="Leírás"
                                setValue={setDescription} />

                            {/* Main category */}
                            <EpistoLabel text="Főkategória">
                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.name + ""}
                                    items={categories}
                                    selectedValue={category}
                                    onSelected={setCategory} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel text="Alkategória">
                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.name + ""}
                                    items={category?.childCategories ?? []}
                                    selectedValue={subCategory}
                                    onSelected={setSubCategory} />
                            </EpistoLabel>

                            {/* Difficulty */}
                            <EpistoLabel text="Nehézség">
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
                            <EpistoLabel text="Tanulási élmény">
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

                            {/* Language */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={language}
                                label="Nyelv"
                                setValue={setLanguage} />

                        </EditSection>

                        {/* requirements section */}
                        <EditSection title="Technikai követelmények" style={{ marginBottom: 50 }}>

                            <SimpleEditList
                                mt="10px"
                                items={technicalRequirements}
                                setItems={setTechnicalRequirements} />
                        </EditSection>
                    </Flex>

                    {/* right pane  */}
                    <Flex direction="column" flex="1" mr="10px" ml="5px">

                        {/* skill improvements section */}
                        <EditSection title="Milyen technikai megoladsokat fogsz megtanulni?">

                            <SimpleEditList
                                mt="10px"
                                items={technicalBenefits}
                                setItems={setTechnicalBenefits} />
                        </EditSection>

                        {/* skill improvements section */}
                        <EditSection title="Milyen human skilleket fejleszt?">

                            {/* skill improvement description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={skillImprovementDescription}
                                label="Elsajátítható készségek"
                                setValue={setSkillImprovementDescription} />

                            {/* improvement stats */}
                            <EpistoLabel text="Mit fejleszt a tanfolyam?">
                                <Flex direction={"column"}>

                                    {/* stats */}
                                    {courseImprovementStats
                                        .map((improvementStat, index) =>
                                            <Flex
                                                flexDir={"row"}
                                                alignItems={"center"}
                                                minW={300}
                                                my={3}>

                                                <EpistoEntry
                                                    marginTop={"0"}
                                                    labelVariant={"top"}
                                                    isMultiline={false}
                                                    value={improvementStat.text}
                                                    setValue={(value) => setCourseImprovementStatValue(index, value)} />

                                                <Slider
                                                    defaultValue={0}
                                                    valueLabelDisplay="auto"
                                                    value={improvementStat.value}
                                                    onChange={(_, targetValue) => setCourseImprovementStatValue(index, undefined, targetValue as number)}
                                                    style={{
                                                        margin: "5px 10px 5px 20px"
                                                    }}
                                                    step={1}
                                                    marks
                                                    min={0}
                                                    max={10} />
                                            </Flex>)}

                                    {/* radar chart */}
                                    <Flex h={300} mt={10}>
                                        <CourseImprovementStatsRadar stats={courseImprovementStats} />
                                    </Flex>
                                </Flex>
                            </EpistoLabel>

                        </EditSection>
                    </Flex>
                </Flex>
            </AdminSubpageHeader>
        </Flex>

    </LoadingFrame>
}
