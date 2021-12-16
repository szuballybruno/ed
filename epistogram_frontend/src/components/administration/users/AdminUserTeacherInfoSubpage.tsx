import {Box, Flex} from "@chakra-ui/react";
import {AdminSubpageHeader} from "../AdminSubpageHeader";
import {applicationRoutes} from "../../../configuration/applicationRoutes";
import React, {useState} from "react";
import {getAssetUrl} from "../../../static/frontendHelpers";
import {EditSection} from "../courses/EditSection";
import {EpistoEntry} from "../../universal/EpistoEntry";
import {Checkbox, Slider, Typography} from "@mui/material";

export const AdminUserTeacherInfoSubpage = () => {
    const [teacherName, setTeacherName] = useState("")
    const mockTeacherBadges = [
        {
            id: 0,
            name: "Not cow patch badge",
            src: getAssetUrl("images/logo.png")
        },{
            id: 1,
            name: "Best history teachern't",
            src: getAssetUrl("images/logo.png")
        },{
            id: 2,
            name: "Best history teachern't",
            src: getAssetUrl("images/logo.png")
        },{
            id: 3,
            name: "Best history teachern't",
            src: getAssetUrl("images/logo.png")
        },{
            id: 4,
            name: "Best history teachern't",
            src: getAssetUrl("images/logo.png")
        }
    ]

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.tasksRoute,
                    applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute
                ]}>
                <Box px="20px" flex="1" alignItems={"flex-start"} maxW={500}>
                    <EditSection title="Jellemzés">

                        {/* Teacher skills */}

                        <EpistoEntry
                            labelVariant={"top"}
                            value={teacherName}
                            label="Szakterület"
                            setValue={setTeacherName} />

                        {/* Teacher courses count */}

                        <EpistoEntry
                            labelVariant={"top"}
                            isNumeric={true}
                            value={teacherName}
                            label="Kurzusok száma"
                            setValue={setTeacherName} />

                        {/* Teacher videos count */}

                        <EpistoEntry
                            labelVariant={"top"}
                            isNumeric={true}
                            value={teacherName}
                            label="Videók száma"
                            setValue={setTeacherName} />

                        {/* Teacher students count */}

                        <EpistoEntry
                            labelVariant={"top"}
                            isNumeric={true}
                            value={teacherName}
                            label="Hallgatók száma"
                            setValue={setTeacherName} />

                        {/* Teacher rating */}

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

                        {/* Teacher badges */}

                        <Typography variant={"overline"} style={{marginTop: "10px" }}>
                            Tanár jelvényei
                        </Typography>

                        <Flex flexWrap={"wrap"}>
                            {mockTeacherBadges.map((badge, index) => {
                                return <Flex
                                    flexDir={"column"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    flex={"0 0 calc(33.3333333% - 10px)"}
                                    bgColor={"#f2f2f2"}
                                    borderRadius={7}
                                    h={180}
                                    boxSizing={"border-box"}
                                    m={5}
                                >
                                    <Flex>
                                        <img src={badge.src} alt={""} />
                                    </Flex>
                                    <Flex>
                                        <Checkbox />
                                        <Typography fontSize={"0.8em"}>{badge.name}</Typography>
                                    </Flex>
                                </Flex>
                            })}
                        </Flex>

                    </EditSection>
                </Box>
            </AdminSubpageHeader>
        </Flex>
    )
}
