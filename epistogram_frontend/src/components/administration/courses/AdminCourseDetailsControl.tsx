import {Box, Divider, Flex, Image, Textarea} from "@chakra-ui/react";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { EditSection } from "./EditSection";
import { SelectImage } from "../../universal/SelectImage";
import { EpistoEntry } from "../../universal/EpistoEntry";
import {Slider, TextareaAutosize, Typography} from "@mui/material";
import { EpistoSelect } from "../../universal/EpistoSelect";
import React, {useEffect, useRef, useState} from "react";
import { CourseEditDataDTO } from "../../../models/shared_models/CourseEditDataDTO";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import {ProfileImage} from "../../ProfileImage";
import {Radar} from "react-chartjs-2";

export const AdminCourseDetailsControl = (props: {
    saveCourseAsync: (dto: CourseEditDataDTO, thumbnailFile: null | File) => Promise<void>,
    courseEditData: CourseEditDataDTO | null,
    courseId: number
}) => {

    const { saveCourseAsync, courseId, courseEditData } = props;

    const categories = courseEditData?.categories ?? [];

    const [title, setTitle] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState<CourseCategoryDTO | null>(null);
    const [subCategory, setSubCategory] = useState<CourseCategoryDTO | null>(null);


    const [courseShortDescription, setCourseShortDescription] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [difficulty, setDifficulty] = useState(0)


    const [radarLevel1, setRadarLevel1] = useState(0)
    const [radarText1, setRadarText1] = useState("")


    // Teacher
    const [teacherAvatarSrc, setTeacherAvatarSrc] = useState("");
    const [teacherAvatarFile, setTeacherAvatarFile] = useState<File | null>(null);
    const teacherAvatarRef = useRef<HTMLImageElement>(null);



    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    const setTeacherAvatar = (src: string, file: File) => {

        if (!teacherAvatarRef.current)
            return;

        setTeacherAvatarSrc(src);
        setTeacherAvatarFile(file);
    }

    useEffect(() => {
        if (!courseEditData)
            return;

        setTitle(courseEditData.title);
        setThumbnailSrc(courseEditData.thumbnailURL);

        // set category
        const currentCategory = categories
            .filter(x => x.id === courseEditData.category.id)[0];

        setCategory(currentCategory);

        // set sub category
        setSubCategory(courseEditData.subCategory);
    }, [courseEditData])

    const handleSaveCourseAsync = () => {
        if (!courseEditData)
            return;

        const dto = {
            courseId: courseId,
            title: title,
            thumbnailURL: thumbnailSrc,
            modules: courseEditData.modules,

            teacher: {
                id: 1,
            } as UserDTO,

            category: {
                id: category?.id!
            },

            subCategory: {
                id: subCategory?.id!
            }
        } as CourseEditDataDTO;

        return saveCourseAsync(dto, thumbnailImageFile);
    }


    return <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

        {/* admin header */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
            ]}
            onSave={handleSaveCourseAsync}>

            {/* Course edit */}
            <Box px="20px" flex="1" alignItems={"flex-start"} maxW={500}>

                {/* Course thumbnail image */}
                <EditSection title="Borítókép">
                    <SelectImage
                        width="300px"
                        height="200px"
                        onImageSelected={setBrowsedImage}>
                        <Image className="whall" objectFit="cover" src={thumbnailSrc}></Image>
                    </SelectImage>
                </EditSection>

                {/* Basic info */}
                <EditSection title="Alapadatok">

                    {/* Title */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={title}
                        label="Név"
                        setValue={setTitle} />

                    {/* Overview description */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Rövid leírás"
                        setValue={setCourseShortDescription} />

                    {/* Overview description */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Leírás az áttekintéshez"
                        setValue={setCourseShortDescription} />

                    {/* Main category */}
                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Főkategória
                    </Typography>

                    {/* Subcategory */}
                    <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.name + ""}
                        items={categories}
                        selectedValue={category}
                        onSelected={setCategory} />

                    {/* Subcategory */}
                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Alkategória
                    </Typography>

                    <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.name + ""}
                        items={category?.childCategories ?? []}
                        selectedValue={subCategory}
                        onSelected={setSubCategory} />

                    {/* Difficulty */}

                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Nehézség
                    </Typography>

                    <Slider
                        aria-label="Nehézség"
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        step={0.5}
                        marks
                        min={0}
                        max={10}
                    />

                    {/* Learning experience */}

                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Tanulási élmény
                    </Typography>

                    <Slider
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        step={0.5}
                        marks
                        min={0}
                        max={5}
                    />


                </EditSection>

                {/* Mit fejleszt, mikor ajánljuk */}
                <EditSection title="Mit fejleszt, mikor ajánljuk">

                    {/* Készségek szöveges leírása */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Elsajátítható készségek"
                        setValue={setCourseShortDescription} />

                    <Flex
                        bgColor={"#f2f2f2"}
                        borderRadius={5}
                        w={"250%"}
                        mt={20}
                    >
                        <Flex flexDir={"row"} minW={300} h={300}>
                            <EpistoEntry
                                labelVariant={"top"}
                                isMultiline={true}
                                value={radarText1}
                                label="1."
                                setValue={setRadarText1} />
                            <Slider
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                value={radarLevel1}
                                onChange={(event, targetValue) => {
                                    setRadarLevel1(targetValue as number)
                                }}
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Flex>
                        <Radar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Felhasználók átlagos tanulási stílusa'
                                    },
                                    legend: {
                                        display: false
                                    }
                                },/*
                            scales: {
                                min: 0,
                                max: 7
                            }*/

                            }}
                            data={{
                                labels: [
                                    radarText1,
                                    'Tul 2',
                                    'Tul 3',
                                    'Tul 4',
                                    'Tul 5',
                                    'Tul 6',
                                    'Tul 7',
                                    'Tul 8',
                                    'Tul 9',
                                    'Tul 10'
                                ],
                                datasets: [
                                    {
                                        data: [radarLevel1, 8, 7, 6, 5, 4, 3, 2, 1],
                                        backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                                    }
                                ]
                            }} />
                    </Flex>


                    {/*
                        TODO:
                            * 4-8 tagú lista, amiket elsajátíthat
                            * Készségek szöveges leírása
                            * 8 oldalú radar arról, miket fejleszt
                            * Leírás, hogy mikor ajánljuk a kurzust
                    */}

                </EditSection>

                {/* Követelmények */}
                <EditSection title="Követelmények">

                    {/*TODO: Technikai követelmények - 0-8 tagú lista*/}

                </EditSection>

                {/* Teacher info edit */}
                <EditSection title="Oktató adatai">

                    {/* Teacher profile image */}
                    <EditSection title="Profilkép">
                        <SelectImage
                            width="200px"
                            height="200px"
                            className="circle"
                            onImageSelected={setTeacherAvatar}>
                            <ProfileImage
                                url={teacherAvatarSrc ?? null}
                                ref={teacherAvatarRef}
                                className="whall" />
                        </SelectImage>
                    </EditSection>

                    <EpistoEntry
                        labelVariant={"top"}
                        value={teacherName}
                        label="Név"
                        setValue={setTeacherName} />

                    <EpistoEntry
                        labelVariant={"top"}
                        value={teacherName}
                        label="Szakterület"
                        setValue={setTeacherName} />
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
                        value={teacherName}
                        label="Kurzusok száma"
                        setValue={setTeacherName} />
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
                        value={teacherName}
                        label="Videók száma"
                        setValue={setTeacherName} />
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
                        value={teacherName}
                        label="Hallgatók száma"
                        setValue={setTeacherName} />
                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Értékelés
                    </Typography>
                    <Slider
                        defaultValue={0}
                        valueLabelDisplay="auto"
                        step={0.5}
                        marks
                        min={0}
                        max={5}
                    />

                    {/*
                        TODO: Legördülő menü előre megadott képekkel
                    */}

                </EditSection>
            </Box>
        </AdminSubpageHeader>
    </Flex>
}
