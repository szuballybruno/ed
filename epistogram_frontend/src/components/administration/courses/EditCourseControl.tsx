import { Flex, Image } from "@chakra-ui/react";
import { Checkbox, Divider, List, ListItem, Radio, TextField, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { getEventFileCallback, getEventValueCallback } from "../../../frontendHelpers";
import { AdminPageEditCourseDTO, EditListItemDTO } from "../../../models/shared_models/AdminPageEditCourseDTO";
import { CourseItemDTO } from "../../../models/shared_models/CourseItemDTO";
import { useAdminEditedCourse } from "../../../services/courseService";
import EditItem from "../../universal/editItem/EditItem";
import { HiddenFileUploadInput } from "../../universal/HiddenFileUploadInput";
import { SelectImage } from "../../universal/SelectImage";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import AdminDashboardHeader from "./adminDashboardHeader/AdminDashboardHeader";
import { AdministrationListItem } from "./adminDashboardSearchItem/AdministrationListItem";
import classes from "./editCourse/editCourse.module.scss";
import { SaveBar } from "./saveBar/SaveBar";
import { AdminDashboardSearch } from "./searchBar/AdminDashboardSearch";
import { SelectMultiple } from "./selectMultiple/SelectMultiple";

export const TextOrInput = (props: { isEditable?: boolean, value: string }) => {
    return props.isEditable ? <TextField value={props.value} /> : <Typography>{props.value}</Typography>
}

const EditSection = (props: {
    title: string,
    children: ReactNode
}) => {

    const { children, title } = props;

    return <Flex direction="column" mt="10px">

        <Typography variant={"overline"}>
            {title}
        </Typography>

        {children}

    </Flex>
}

export const EditCourseControl = (props: {
    saveCourseAsync: (dto: AdminPageEditCourseDTO) => Promise<void>
}) => {

    const { saveCourseAsync } = props;
    const { courseId } = useParams<{ courseId: string }>();
    const [isAllowEditOnPage, setIsAllowEditOnPage] = useState(false)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [courseGroup, setCourseGroup] = useState("")
    const [permissionLevel, setPermissionLevel] = useState("")
    const [thumbnailSrc, setThumbnailSrc] = useState("")
    const [colorOne, setColorOne] = useState("")
    const [colorTwo, setColorTwo] = useState("")
    const [courseItems, setCourseItems] = useState<CourseItemDTO[]>([])
    const [organizations, setOrganizations] = useState<EditListItemDTO[]>([])
    const [groups, setGroups] = useState<EditListItemDTO[]>([])
    const [tags, setTags] = useState<EditListItemDTO[]>([])
    const [teachers, setTeachers] = useState<EditListItemDTO[]>([])
    const { course } = useAdminEditedCourse(Number(courseId));

    const handleSaveCourseAsync = async () => {

        const dto = {
            courseId: course?.courseId,
            title: title,
            category: category,
            courseGroup: courseGroup,
            permissionLevel: permissionLevel,
            thumbnailURL: thumbnailSrc,
            colorOne: colorOne,
            colorTwo: colorTwo,
            courseItems: course?.courseItems,
            organizations: organizations,
            tags: tags,
            teachers: teachers,
            groups: groups
        } as AdminPageEditCourseDTO;

        setIsAllowEditOnPage(p => !p)
        return saveCourseAsync(dto);
    }

    // set default values 
    useEffect(() => {

        if (!course)
            return;

        const {
            title,
            category,
            courseGroup,
            permissionLevel,
            thumbnailURL,
            colorOne,
            colorTwo,
            courseItems,
            organizations,
            tags,
            teachers,
            groups
        } = course

        setTitle(title)
        setCategory(category)
        setCourseGroup(courseGroup)
        setPermissionLevel(permissionLevel)
        setThumbnailSrc(thumbnailURL)
        setColorOne(colorOne)
        setColorTwo(colorTwo)
        setCourseItems(courseItems)
        setOrganizations(organizations)
        setTags(tags)
        setTeachers(teachers)
        setGroups(groups)
    }, [course]);

    const handleOnDragEnd = (dragParams) => {
        const items = Array.from(courseItems)
        const [reorderedItem] = items.splice(dragParams.source.index, 1)
        items.splice(dragParams.destination.index, 0, reorderedItem)

        setCourseItems(items)
    }

    const DraggableListItemWrapper = ({ ...props }) => <Draggable
        key={props.key}
        draggableId={props.draggableId}
        index={props.index}>
        {(provided) => (
            <li className={classes.draggableListItem}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {props.children}
            </li>
        )}
    </Draggable>

    const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(null);
    const fileBrowseInputRef = useRef<HTMLInputElement>(null);

    const setBrowsedImage = (src: string, file: File) => {

        setThumbnailSrc(src);
        setThumbnailImageFile(file);
    }

    return <Flex direction="column">

        {/* hidden input */}
        <HiddenFileUploadInput
            ref={fileBrowseInputRef}
            onImageSelected={setBrowsedImage} />

        {/* admin header */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute
            ]}>
        </AdminSubpageHeader>

        <div className={classes.editDataOuterWrapper}>

            <div className={classes.editDataInnerWrapper}>
                <div className={classes.editDataLeftWrapper}>

                    <div className={classes.editDataListWrapper}>

                        <EditSection title="Borítókép">
                            <SelectImage
                                width="300px"
                                height="200px"
                                onClick={() => fileBrowseInputRef?.current?.click()}>
                                <Image className="whall" objectFit="cover" src={thumbnailSrc}></Image>
                            </SelectImage>
                        </EditSection>

                        {/* basic info edit */}
                        <EditSection title="Alapadatok">
                            <Flex direction="column">

                                <EditItem
                                    isEditing={isAllowEditOnPage}
                                    value={title}
                                    title={"Név"}
                                    onChange={getEventValueCallback(setTitle)}
                                    name={"name"} />

                                <EditItem
                                    isEditing={isAllowEditOnPage}
                                    value={category}
                                    title={"Kategória"}
                                    onChange={getEventValueCallback(setCategory)}
                                    name={"category"} />

                                <EditItem
                                    isEditing={isAllowEditOnPage}
                                    value={courseGroup}
                                    title={"Kategória csoport"}
                                    onChange={getEventValueCallback(setCourseGroup)}
                                    name={"courseGroup"} />

                                <EditItem
                                    isEditing={isAllowEditOnPage}
                                    value={permissionLevel}
                                    title={"Elérés"}
                                    onChange={getEventValueCallback(setPermissionLevel)}
                                    name={"permissionLevel"} />
                            </Flex>
                        </EditSection>
                    </div>
                </div>




                <Divider orientation={"vertical"} />





                <div className={classes.editDataRightWrapper}>
                    <SelectMultiple
                        items={course?.organizations}
                        title={"Cég kiválasztása"}
                    >
                        {course?.organizations?.map((item, index) =>
                            <div key={"org" + index}>
                                <ListItem className={classes.listItem}>
                                    <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                        let items = [...organizations];
                                        items[index] = {
                                            ...items[index],
                                            checked: e.currentTarget.checked
                                        };
                                        setGroups(items);
                                    })} />
                                    <TextOrInput value={item.name} />
                                </ListItem>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        )}

                    </SelectMultiple>
                    <SelectMultiple
                        items={groups}
                        title={"Csoport kiválasztása"}
                    >
                        {groups?.map((item, index) =>
                            <div key={"group" + index}>
                                <ListItem className={classes.listItem}>
                                    <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                        let items = [...groups];
                                        items[index] = {
                                            ...items[index],
                                            checked: e.currentTarget.checked
                                        };
                                        setGroups(items);
                                    })} />
                                    <TextOrInput value={item.name} />
                                </ListItem>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        )}

                    </SelectMultiple>
                    <SelectMultiple
                        items={teachers}
                        title={"Tanár kiválasztása"}
                    >
                        {teachers?.map((item, index) =>
                            <div key={"teacher" + index}>
                                <ListItem className={classes.listItem}>
                                    <Radio disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                        let items = [...teachers];
                                        items[index] = {
                                            ...items[index],
                                            checked: e.currentTarget.checked
                                        };
                                        setGroups(items);
                                    })} />
                                    <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                </ListItem>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        )}

                    </SelectMultiple>
                    <SelectMultiple
                        items={tags}
                        title={"Tagek kiválasztása"}
                    >
                        {tags?.map((item, index) =>
                            <div key={"tag" + index}>
                                <ListItem className={classes.listItem}>
                                    <Checkbox disabled={!isAllowEditOnPage} checked={item.checked} onChange={((e) => {
                                        let items = [...tags];
                                        items[index] = {
                                            ...items[index],
                                            checked: e.currentTarget.checked
                                        };
                                        setGroups(items);
                                    })} />
                                    <TextOrInput isEditable={isAllowEditOnPage} value={item.name} />
                                </ListItem>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        )}

                    </SelectMultiple>

                </div>
            </div>

        </div>

        <Divider style={{
            width: "100%"
        }} />

        <Flex
            direction={"column"}
            px={10}>
            <AdminDashboardSearch searchChangeHandler={() => { }} name={"searchData"} title={"A kurzus tartalma"} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={"courseItems"}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {courseItems.map((item, index) => <DraggableListItemWrapper key={item.title} draggableId={item.title} index={index}>
                                <AdministrationListItem
                                    key={"adlistitem" + index}
                                    title={item.title}
                                    thumbnailUrl={item.thumbnailUrl}
                                    chips={[]/*[
                                            getChipWithLabel("a" + index, "item.type", "category"),
                                            getChipWithLabel("b" + index, "item.length", "person"),
                                            getChipWithLabel("c" + index, "item.isEssential", "video")
                                        ]*/}
                                    searchItemButtons={[]}
                                />
                            </DraggableListItemWrapper>
                            )}{provided.placeholder}
                        </div>

                    )}
                </Droppable>

            </DragDropContext>
        </Flex>

        <AdminDashboardHeader titleText={""} />

        <SaveBar
            open={isAllowEditOnPage}
            onClick={() => setIsAllowEditOnPage(p => !p)}
            onDoneClick={handleSaveCourseAsync} />

    </Flex>
};
