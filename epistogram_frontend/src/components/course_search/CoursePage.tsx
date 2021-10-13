import React, {useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import {useParams} from "react-router";
import {Box, Container, Divider, Flex} from "@chakra-ui/react";
import {useAdminEditedCourse} from "../../services/courseService";
import {CourseItemDTO} from "../../models/shared_models/CourseItemDTO";
import {AdminPageEditCourseDTO} from "../../models/shared_models/AdminPageEditCourseDTO";
import {MainWrapper} from "../HOC/MainPanels";
import {Tab, Tabs, Typography} from "@mui/material";
import {getAssetUrl} from "../../frontendHelpers";
import {EpistoButton} from "../universal/EpistoButton";
import {LearningStatisticsSeciton} from "../learningStatistics/LearningStatisticsSeciton";
import {EpistoHeader} from "../administration/universal/EpistoHeader";

export type GetCourseShortDTO = {
    firstItemCode: string;
    thumbnailImageURL: string;
    colorOne: any;
    colorTwo: any;
    title: string;
    teacherName: string;
    category: string;
    isComplete: boolean;
}

const CoursePage = () => {
    const params: {
        courseId: string
    } = useParams()

    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const [thumbnailURL, setThumbnailURL] = useState("")
    const [colorOne, setColorOne] = useState("")
    const [colorTwo, setColorTwo] = useState("")
    const [title, setTitle] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [category, setCategory] = useState("")
    const [courseItems, setCourseItems] = useState<CourseItemDTO[]>([])

    const { course, status, error } = useAdminEditedCourse(Number(params.courseId));

    const setEditCourseState = (course: AdminPageEditCourseDTO) => {
        const {
            title,
            category,
            thumbnailURL,
            colorOne,
            colorTwo,
            courseItems
        } = course

        setTitle(title)
        setCategory(category)
        setThumbnailURL(thumbnailURL)
        setColorOne(colorOne)
        setColorTwo(colorTwo)
        setCourseItems(courseItems)
    }
    useEffect(() => {
        !!course && setEditCourseState(course)
    }, [course])

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <MainWrapper>
            <Navbar />
            <Flex position={"relative"} id="rightPanel"
                //bg="#fafafa"
                  p={0}
                  flex="1"
                  overflowX="hidden"
                  overflowY="scroll"
                  direction="column">
                <Flex
                    w={"100%"}
                    pl={110}
                    pb={10}
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-end"}
                    minH={140}
                    h={140}>
                    <Typography variant={"h4"}>{JSON.stringify(title)}</Typography>
                </Flex>

                <Flex direction={"row"} px={100} w={"100%"} minH={1000}>
                    <Flex flex={"1 1 0"} direction={"column"} mr={30}>
                        <Container pr={20} pt={20}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices suscipit risus, sit amet hendrerit massa posuere in. Phasellus at convallis elit, eget iaculis lacus. Maecenas nec nulla ligula. Nullam facilisis tempus nibh sed sodales. Quisque id fermentum diam, non pharetra justo. Donec a consectetur ligula. Fusce faucibus tincidunt sem quis suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque dapibus ligula in metus pulvinar ultrices. Nulla vel lectus mauris.
                        </Container>
                        <Flex direction={"row"} mt={20} w={"100%"} justifyContent={"space-evenly"}>
                            <Flex direction={"row"}
                                  w={200}
                                  h={60}
                                  bg={"white"}
                                  borderWidth={1}
                                  borderRadius={5}
                                  shadow={"#00000024 0px 0px 3px 0px"}>
                                <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                                    <img src={getAssetUrl("")} alt={""} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                </Flex>
                                <Flex ml={5} w={135} direction={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography fontSize={12} fontWeight={"bold"}>Kategória</Typography>
                                    <Typography fontSize={12}>{category}</Typography>
                                </Flex>
                            </Flex>

                            <Flex direction={"row"}
                                  w={200}
                                  h={60}
                                  bg={"white"}
                                  borderWidth={1}
                                  borderRadius={5}
                                  shadow={"#00000024 0px 0px 3px 0px"}>
                                <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                                    <img src={getAssetUrl("")} alt={""} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                </Flex>
                                <Flex ml={5} w={135} direction={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography fontSize={12} fontWeight={"bold"}>Tanár</Typography>
                                    <Typography fontSize={12}>{"Oláh Mihály"}</Typography>
                                </Flex>
                            </Flex>

                            <Flex direction={"row"}
                                  w={200}
                                  h={60}
                                  bg={"white"}
                                  borderWidth={1}
                                  borderRadius={5}
                                  shadow={"#00000024 0px 0px 3px 0px"}>
                                <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                                    <img src={getAssetUrl("")} alt={""} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                </Flex>
                                <Flex ml={5} w={135} direction={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography fontSize={12} fontWeight={"bold"}>Nehézség</Typography>
                                    <Typography fontSize={12}>{"6.9/10 pont"}</Typography>
                                </Flex>
                            </Flex>
                            <Flex direction={"row"}
                                  w={200}
                                  h={60}
                                  bg={"white"}
                                  borderWidth={1}
                                  borderRadius={5}
                                  shadow={"#00000024 0px 0px 3px 0px"}>
                                <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                                    <img src={getAssetUrl("")} alt={""} style={{
                                        width: 50,
                                        height: 50
                                    }} />
                                </Flex>
                                <Flex ml={5} w={135} direction={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                                    <Typography fontSize={12} fontWeight={"bold"}>Tanulási élmény</Typography>
                                    <Typography fontSize={12}>"4.5/5.0 pont"</Typography>
                                </Flex>
                            </Flex>
                        </Flex>


                        <Box w={"100%"} mt={30}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Áttekintés" {...a11yProps(0)} />
                                    <Tab label="Követelmények" {...a11yProps(1)} />
                                    <Tab label="Tartalom" {...a11yProps(2)} />
                                    <Tab label="Az oktatóról" {...a11yProps(3)} />
                                    <Tab label="Értékelések" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={currentTab} index={0}>
                                <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>
                                    <EpistoHeader text={"A kurzus rövid leírása"} my={10} />
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.

                                        Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus. Donec porttitor, sem vitae posuere lacinia, mauris libero sagittis dui, non viverra purus lectus ut urna. Pellentesque semper, eros ac maximus vehicula, orci odio tempor magna, vel rutrum nisi nisl id mauris. Cras ullamcorper lacus elementum venenatis feugiat. Donec magna dui, vulputate ac massa ut, placerat imperdiet mauris. Fusce pellentesque ipsum nunc, eu lobortis libero porttitor id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tempor euismod erat, finibus commodo felis mollis a. Ut rhoncus convallis sem, in varius tortor dapibus et. Donec ultricies accumsan neque, eget bibendum ante fringilla sed.
                                    </Typography>
                                    <EpistoButton>
                                        Bővebben
                                    </EpistoButton>
                                    <EpistoHeader text={"Mit tanulhatsz ezen a kurzuson?"} my={10}  />
                                    <EpistoHeader text={"Milyen készségeket fejleszt a tanfolyam?"} my={10}  />
                                </Flex>
                            </TabPanel>
                            <TabPanel value={currentTab} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={currentTab} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>


                    </Flex>
                    <Flex direction={"column"} w={400}>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            margin={10}
                            boxSizing={"border-box"}
                            bg={"white"}
                            h={580}
                            borderWidth={1}
                            borderRadius={10}
                            shadow={"#00000024 0px 0px 5px 0px"}>
                            <Flex w={"100%"} height={230} justifyContent={"center"} p={10}>
                                <img src={thumbnailURL} style={{
                                    borderRadius: 5,
                                    objectFit: "cover"
                                }} alt={""} />
                            </Flex>
                            <Flex w={"100%"} h={30} px={15}  mt={10}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Kurzus hossza</Typography>
                                    <Typography>4h 12m</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Témakörök száma</Typography>
                                    <Typography>12</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Videók száma</Typography>
                                    <Typography>119</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Tudást felmérő kérdések</Typography>
                                    <Typography>187</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Nyelv</Typography>
                                    <Typography>magyar</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Hányan végezték el eddig</Typography>
                                    <Typography>4139</Typography>
                                </Flex>
                            </Flex>
                            <Divider h={1} w={"89%"} bg={"lightgray"} my={3} />
                            <Flex w={"100%"} h={30} px={15}>
                                <Flex w={30} h={30} bg={"purple"}></Flex>
                                <Flex direction={"row"} flex={1} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography>Legutolsó frissítés dátuma</Typography>
                                    <Typography>2021. 10. 13.</Typography>
                                </Flex>
                            </Flex>
                            <EpistoButton
                                style={{ flex: "1", color: "var(--epistoTeal)", maxHeight: 40, marginTop: 15, marginBottom: 15 }}
                                variant="outlined"
                                onClick={() => {}}
                                icon={
                                    <img
                                        src={getAssetUrl("/icons/play2.svg")}
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            marginRight: "5px"
                                        }} />
                                }>
                                Elkezdem a kurzus
                            </EpistoButton>
                        </Flex>
                        <Box
                            margin={10}
                            boxSizing={"border-box"}
                            bg={"white"}
                            h={450}
                            borderWidth={1}
                            borderRadius={10}
                            shadow={"#00000024 0px 0px 5px 0px"}>

                        </Box>
                    </Flex>
                </Flex>
                <Flex _before={{
                    position: "absolute",
                    content: `""`,
                    top: -400,
                    left: 500,
                    width: 1000,
                    height: 1000,
                    borderRadius: "50%",
                    backgroundColor: "#EFF9FFFF",

                }} position={"absolute"} top={0} left={0} w={"70%"} h={300} bg={"#eff9ff"} zIndex={-1} backgroundClip={"padding-box"} />
            </Flex>

        </MainWrapper>
    );
};

export default CoursePage;
