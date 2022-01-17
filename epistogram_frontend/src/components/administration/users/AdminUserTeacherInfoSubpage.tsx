import { Flex } from "@chakra-ui/react";
import { Checkbox, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { TeacherBadgeNameType } from "../../../models/shared_models/types/sharedTypes";
import { useSaveTeacherInfoData, useTeacherInfoEditData } from "../../../services/api/teacherInfoApiService";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { EpistoLabel } from "../../controls/EpistoLabel";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminUserTeacherInfoSubpage = () => {

    const params = useParams<{ userId: string }>();
    const editedUserId = parseInt(params.userId);
    const { teacherInfoEditData } = useTeacherInfoEditData(editedUserId);
    const { saveTeacherInfoAsync, saveTeacherInfoState } = useSaveTeacherInfoData();
    const showError = useShowErrorDialog();

    const [skills, setSkills] = useState("");
    const [courseCount, setCoursesCount] = useState("");
    const [videoCount, setVideoCount] = useState("");
    const [studentCount, setStudentCount] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [selectedBadges, setSelectedBadges] = useState<TeacherBadgeNameType[]>([]);

    useEffect(() => {

        if (!teacherInfoEditData)
            return;

        setSelectedBadges(teacherInfoEditData.badges);
        setSkills(teacherInfoEditData.skills);
        setVideoCount(teacherInfoEditData.videoCount + "");
        setStudentCount(teacherInfoEditData.studentCount + "");
        setCoursesCount(teacherInfoEditData.courseCount + "");
        setRating(teacherInfoEditData.rating);
        setDescription(teacherInfoEditData.description);
    }, [teacherInfoEditData]);

    const allBadges = [
        {
            name: "badge1",
            icon: ""
        },
        {
            name: "badge2",
            icon: ""
        },
        {
            name: "badge3",
            icon: ""
        }
    ] as ({
        name: TeacherBadgeNameType,
        icon: any
    })[];

    const handleSaveAsync = async () => {

        try {

            await saveTeacherInfoAsync({
                badges: selectedBadges,
                rating,
                courseCount: parseInt(courseCount),
                id: teacherInfoEditData?.id!,
                skills: skills,
                studentCount: parseInt(studentCount),
                videoCount: parseInt(videoCount),
                description
            });

            showNotification("Tanar informaciok sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute
                ]}>

                <Flex
                    px="20px"
                    flex="1"
                    direction="column"
                    width="100%"
                    maxW={900}>

                    {/* Teacher skills */}
                    <EpistoEntry
                        labelVariant={"top"}
                        value={skills}
                        label="Szakterület"
                        setValue={setSkills} />

                    {/* description */}
                    <EpistoEntry
                        labelVariant={"top"}
                        value={description}
                        label="Leiras"
                        isMultiline
                        setValue={setDescription} />

                    {/* Teacher courses count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        type="number"
                        value={courseCount}
                        label="Kurzusok száma"
                        setValue={setCoursesCount} />

                    {/* Teacher videos count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        type="number"
                        value={videoCount}
                        label="Videók száma"
                        setValue={setVideoCount} />

                    {/* Teacher students count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        type="number"
                        value={studentCount}
                        label="Hallgatók száma"
                        setValue={setStudentCount} />

                    {/* Teacher rating */}
                    <EpistoLabel text="Értékelés">
                        <Slider
                            defaultValue={0}
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks
                            value={rating}
                            onChange={(_, x) => setRating(x as number)}
                            min={0}
                            max={5} />
                    </EpistoLabel>

                    {/* Teacher badges */}
                    <EpistoLabel text="Tanár jelvényei">
                        <Flex flexWrap={"wrap"}>
                            {allBadges
                                .map((badge, index) => {
                                    return <Flex
                                        flexDir={"column"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                        flex={"0 0 calc(33.3333333% - 10px)"}
                                        bgColor={"#f2f2f2"}
                                        borderRadius={7}
                                        h={180}
                                        boxSizing={"border-box"}
                                        m={5}>

                                        <Flex>
                                            <img src={badge.icon} alt={""} />
                                        </Flex>

                                        <Flex>
                                            <Checkbox
                                                checked={selectedBadges.some(x => x === badge.name)}
                                                onChange={(_, y) => {

                                                    if (y) {

                                                        setSelectedBadges([...selectedBadges, badge.name]);
                                                    }
                                                    else {

                                                        setSelectedBadges(selectedBadges.filter(x => x !== badge.name));
                                                    }
                                                }} />

                                            <Typography fontSize={"0.8em"}>
                                                {badge.name}
                                            </Typography>
                                        </Flex>
                                    </Flex>
                                })}
                        </Flex>
                    </EpistoLabel>

                    {/* submit button */}
                    <EpistoButton
                        variant={"outlined"}
                        onClick={() => handleSaveAsync()}
                        style={{ marginTop: "20px" }}>

                        Mentes
                    </EpistoButton>
                </Flex>
            </AdminSubpageHeader>
        </Flex>
    )
}
