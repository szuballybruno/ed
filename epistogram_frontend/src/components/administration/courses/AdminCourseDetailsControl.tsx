import {Box, Flex, Image} from "@chakra-ui/react";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { EditSection } from "./EditSection";
import { SelectImage } from "../../universal/SelectImage";
import { EpistoEntry } from "../../universal/EpistoEntry";
import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slider,
    Typography
} from "@mui/material";
import { EpistoSelect } from "../../universal/EpistoSelect";
import React, {useEffect, useState} from "react";
import { CourseEditDataDTO } from "../../../models/shared_models/CourseEditDataDTO";
import { CourseCategoryDTO } from "../../../models/shared_models/CourseCategoryDTO";
import { UserDTO } from "../../../models/shared_models/UserDTO";
import {Radar} from "react-chartjs-2";
import {Add, Delete} from "@mui/icons-material";
import {EpistoButton} from "../../universal/EpistoButton";

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


    // What will it develop, when we recommend it?

    const [radarLevels, setRadarLevels] = useState<number[]>([])
    const [radarTexts, setRadarTexts] = useState<string[]>([])


    const setRadarLevelByIndex = (index: number, value: number) => {
        let newRadarLevelState = [...radarLevels];
        newRadarLevelState[index] = value;
        return setRadarLevels(newRadarLevelState)
    }
    const setRadarTextByIndex = (index: number, value: string) => {
        let newRadarTextState = [...radarTexts];
        newRadarTextState[index] = value;
        return setRadarTexts(newRadarTextState)
    }

    useEffect(() => {
        setRadarLevels(Array(10).fill(0))
        setRadarTexts(Array(10).fill(""))
    }, [])

    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
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
                        <Image className="whall" objectFit="cover" src={thumbnailSrc} />
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

                    {/* Short description */}
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

                    {/* Language */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Nyelv"
                        setValue={setCourseShortDescription} />


                </EditSection>

                {/* What will it develop, when we recommend it? */}
                <EditSection title="Mit fejleszt, mikor ajánljuk">

                    {/* Skills to be acquired */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Elsajátítható készségek"
                        setValue={setCourseShortDescription} />

                    {/* What the course will develop? */}
                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Mit fejleszt a tanfolyam?
                    </Typography>
                    <Flex
                        bgColor={"#f2f2f2"}
                        borderRadius={5}
                        flexDir={"column"}
                        w={"100%"}
                    >
                        {[...Array(10)].map((e, i) =>
                            <Flex
                                flexDir={"row"}
                                alignItems={"center"}
                                minW={300}
                                my={3}
                            >
                                <EpistoEntry
                                    style={{
                                        padding: "0 10px"
                                    }}
                                    marginTop={"0"}
                                    labelVariant={"top"}
                                    isMultiline={false}
                                    value={radarTexts[i]}
                                    setValue={(value) => setRadarTextByIndex(i, value)}
                                />
                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    value={radarLevels[i]}
                                    onChange={(event, targetValue) => {
                                        setRadarLevelByIndex(i, targetValue as number)
                                    }}
                                    style={{
                                        margin: "0 10px"
                                    }}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                />
                            </Flex>
                        )}
                        <Flex h={300} mt={10}>
                            <Radar
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        r: {
                                            angleLines: {
                                                display: false
                                            },
                                            suggestedMin: 0,
                                            suggestedMax: 10
                                        },
                                    },
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Mit fejleszt a tanfolyam?"
                                        },
                                        legend: {
                                            display: false
                                        }
                                    },
                                }}
                                data={{
                                    labels: radarTexts,
                                    datasets: [
                                        {
                                            data: radarLevels,
                                            backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                                        }
                                    ]
                                }} />
                        </Flex>
                    </Flex>

                    {/* When we recommend the course? */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isMultiline={true}
                        value={courseShortDescription}
                        label="Mikor ajánljuk a kurzust"
                        setValue={setCourseShortDescription} />

                    {/* What can you learn? */}
                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Amiket a kurzus folyamán elsajátíthatsz
                    </Typography>

                    <List dense={false}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                    </List>
                    <EpistoButton variant={"outlined"}>
                        <Add />
                    </EpistoButton>

                </EditSection>

                {/* Technical requirements */}
                <EditSection title="Követelmények" style={{marginBottom: 50}}>

                    <Typography variant={"overline"} style={{marginTop: "10px" }}>
                        Technikai követelmények
                    </Typography>
                    <List dense={false}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary="Single-line item"
                            />
                        </ListItem>
                    </List>
                    <EpistoButton variant={"outlined"}>
                        <Add />
                    </EpistoButton>

                </EditSection>
            </Box>
        </AdminSubpageHeader>
    </Flex>
}
