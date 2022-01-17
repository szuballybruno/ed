import { Flex, Image } from "@chakra-ui/react";
import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { CourseDetailsEditDataDTO } from "../../../models/shared_models/CourseDetailsEditDataDTO";
import { HumanSkillBenefitDTO } from "../../../models/shared_models/HumanSkillBenefitDTO";
import { CourseVisibilityType } from "../../../models/shared_models/types/sharedTypes";
import { useCourseDetailsEditData, useSaveCourseDetailsData, useUploadCourseThumbnailAsync } from "../../../services/api/courseApiService";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { iterate } from "../../../static/frontendHelpers";
import { LoadingFrame } from "../../system/LoadingFrame";
import { CourseImprovementStatsRadar } from "../../universal/CourseImprovementStatsRadar";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { EditSection } from "./EditSection";
import { SimpleEditList } from "../SimpleEditList";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { EpistoSelect } from "../../controls/EpistoSelect";

export const AdminCourseDetailsSubpage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const showError = useShowErrorDialog();

    // api calls
    const { courseDetailsEditData, courseDetailsEditDataError, courseDetailsEditDataState } = useCourseDetailsEditData(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseDetailsData();
    const { saveCourseThumbnailAsync, saveCourseThumbnailState } = useUploadCourseThumbnailAsync();

    const categories = courseDetailsEditData?.categories ?? [];
    const teachers = courseDetailsEditData?.teachers ?? [];

    const [title, setTitle] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);
    const [shortDescription, setShortDescription] = useState("");
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
        setVisibility(courseDetailsEditData.visibility);
        setTeacherId(courseDetailsEditData.teacherId);
        setHumanSkillBenefitsDescription(courseDetailsEditData.humanSkillBenefitsDescription);
        setSkillBenefits(courseDetailsEditData.skillBenefits);
        setTechnicalRequirements(courseDetailsEditData.technicalRequirements);
        setHumanSkillBenefits(courseDetailsEditData.humanSkillBenefits);
        setPrevCompletedCount(courseDetailsEditData.previouslyCompletedCount + "");

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

                            {/* Subcategory */}
                            <EpistoLabel text="Tanar">
                                <EpistoSelect
                                    getCompareKey={x => x?.id + ""}
                                    getDisplayValue={x => x?.fullName + ""}
                                    items={teachers}
                                    selectedValue={teachers.filter(x => x.id === teacherId)[0]}
                                    onSelected={x => setTeacherId(x.id)} />
                            </EpistoLabel>

                            {/* Subcategory */}
                            <EpistoLabel text="Elerhetosegi szint">
                                <EpistoSelect
                                    getCompareKey={x => x}
                                    getDisplayValue={x => x === "public" ? "Publikus" : "Privat"}
                                    items={["public", "private"] as CourseVisibilityType[]}
                                    selectedValue={visibility}
                                    onSelected={setVisibility} />
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

                            {/* previously completed count */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                type="number"
                                value={prevCompletedCount}
                                label="Elvegzesek szama"
                                setValue={setPrevCompletedCount} />

                        </EditSection>

                        {/* requirements section */}
                        <EditSection title="Technikai követelmények" style={{ marginBottom: 50 }}>

                            <SimpleEditList
                                mt="10px"
                                items={technicalRequirements}
                                initialValue=""
                                setItems={setTechnicalRequirements} />
                        </EditSection>
                    </Flex>

                    {/* right pane  */}
                    <Flex direction="column" flex="1" mr="10px" ml="5px">

                        {/* skill improvements section */}
                        <EditSection title="Milyen technikai megoladsokat fogsz megtanulni?">

                            <SimpleEditList
                                mt="10px"
                                items={skillBenefits}
                                initialValue=""
                                setItems={setSkillBenefits} />
                        </EditSection>

                        {/* skill improvements section */}
                        <EditSection title="Milyen human skilleket fejleszt?">

                            {/* skill improvement description */}
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={humanSkillBenefitsDescription}
                                label="Elsajátítható készségek"
                                setValue={setHumanSkillBenefitsDescription} />

                            {/* improvement stats */}
                            <EpistoLabel text="Mit fejleszt a tanfolyam?">

                                <SimpleEditList
                                    mt="10px"
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
                                                marginTop={"0"}
                                                labelVariant={"top"}
                                                isMultiline={false}
                                                value={item.text}
                                                setValue={(value) => onItemChanged({ ...item, text: value })} />

                                            <Slider
                                                defaultValue={0}
                                                valueLabelDisplay="auto"
                                                value={item.value}
                                                onChange={(_, targetValue) => onItemChanged({ ...item, value: targetValue as number })}
                                                style={{
                                                    margin: "5px 10px 5px 20px"
                                                }}
                                                step={1}
                                                marks
                                                min={0}
                                                max={10} />
                                        </Flex>
                                    )} />

                                <Flex direction={"column"}>

                                    {/* radar chart */}
                                    <Flex mt="10px" align="center" justify="center">
                                        <CourseImprovementStatsRadar stats={humanSkillBenefits} />
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
