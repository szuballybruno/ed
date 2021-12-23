import { Box, Flex } from "@chakra-ui/react";
import { Checkbox, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useSaveTeacherInfoData, useTeacherInfoEditData } from "../../../services/api/teacherInfoApiService";
import { showNotification, useShowErrorDialog } from "../../../services/core/notifications";
import { EpistoButton } from "../../universal/EpistoButton";
import { EpistoEntry } from "../../universal/EpistoEntry";
import { EpistoLabel } from "../../universal/EpistoLabel";
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
    const [rating, setRating] = useState(0);
    const [badges, setBadges] = useState(["badge1"]);

    useEffect(() => {

        if (!teacherInfoEditData)
            return;

        setBadges(teacherInfoEditData.badges);
        setSkills(teacherInfoEditData.skills);
        setVideoCount(teacherInfoEditData.videoCount + "");
        setStudentCount(teacherInfoEditData.studentCount + "");
        setCoursesCount(teacherInfoEditData.courseCount + "");
        setRating(teacherInfoEditData.rating);
    }, [teacherInfoEditData]);

    const allBadges = [
        {
            name: "badge1",
            icon: ""
        },
        {
            name: "badge2",
            icon: ""
        }
    ]

    const handleSaveAsync = async () => {

        try {

            await saveTeacherInfoAsync({
                badges,
                rating,
                courseCount: parseInt(courseCount),
                id: teacherInfoEditData?.id!,
                skills: skills,
                studentCount: parseInt(studentCount),
                videoCount: parseInt(videoCount)
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

                    {/* Teacher courses count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
                        value={courseCount}
                        label="Kurzusok száma"
                        setValue={setCoursesCount} />

                    {/* Teacher videos count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
                        value={videoCount}
                        label="Videók száma"
                        setValue={setVideoCount} />

                    {/* Teacher students count */}
                    <EpistoEntry
                        labelVariant={"top"}
                        isNumeric={true}
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
                                .map((badgeSlug, index) => {
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
                                            <img src={badgeSlug.icon} alt={""} />
                                        </Flex>

                                        <Flex>
                                            <Checkbox />
                                            <Typography fontSize={"0.8em"}>{badgeSlug.name}</Typography>
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
