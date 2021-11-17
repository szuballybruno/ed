import {Box, Divider, Flex, Image} from "@chakra-ui/react";
import {AdminSubpageHeader} from "../AdminSubpageHeader";
import {applicationRoutes} from "../../../configuration/applicationRoutes";
import {EditSection} from "./EditSection";
import {SelectImage} from "../../universal/SelectImage";
import {EpistoEntry} from "../../universal/EpistoEntry";
import {Typography} from "@mui/material";
import {EpistoSelect} from "../../universal/EpistoSelect";
import React, {useEffect, useState} from "react";
import {CourseEditDataDTO} from "../../../models/shared_models/CourseEditDataDTO";
import {CourseCategoryDTO} from "../../../models/shared_models/CourseCategoryDTO";
import {UserDTO} from "../../../models/shared_models/UserDTO";

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
    }, [])

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

            {/* settings */}
            <Box px="20px" flex="1" alignItems={"flex-start"} maxW={500}>

                {/* thumbnaul image */}
                <EditSection title="Borítókép">
                    <SelectImage
                        width="300px"
                        height="200px"
                        onImageSelected={setBrowsedImage}>
                        <Image className="whall" objectFit="cover" src={thumbnailSrc}></Image>
                    </SelectImage>
                </EditSection>

                {/* basic info edit */}
                <EditSection title="Alapadatok">

                    <EpistoEntry
                        value={title}
                        label="Név"
                        setValue={setTitle} />

                    {/* category */}
                    <Typography style={{ color: "gray", marginTop: "10px" }}>
                        Főkategória
                    </Typography>
                    <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.name + ""}
                        items={categories}
                        selectedValue={category}
                        onSelected={setCategory} />

                    {/* subcategory */}
                    <Typography style={{ color: "gray", marginTop: "10px" }}>
                        Alkategória
                    </Typography>
                    <EpistoSelect
                        getCompareKey={x => x?.id + ""}
                        getDisplayValue={x => x?.name + ""}
                        items={category?.childCategories ?? []}
                        selectedValue={subCategory}
                        onSelected={setSubCategory} />
                </EditSection>
            </Box>
        </AdminSubpageHeader>
    </Flex>
}
