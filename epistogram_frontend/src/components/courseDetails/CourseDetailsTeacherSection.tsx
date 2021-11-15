import {Flex} from "@chakra-ui/react";
import {EpistoHeader} from "../EpistoHeader";
import React from "react";
import {Typography} from "@mui/material";
import {getAssetUrl} from "../../frontendHelpers";
import {EpistoButton} from "../universal/EpistoButton";

export const CourseDetailsTeacherSection = () => {

    const mockTeacherDetails = [{
        icon: getAssetUrl("/course_page_icons/teacher_courses.svg"),
        title: "4 kurzus"
    },{
        icon: getAssetUrl("/course_page_icons/teacher_videos.svg"),
        title: "359 videó"
    },{
        icon: getAssetUrl("/course_page_icons/teacher_enrolled.svg"),
        title: "12187 hallgató"
    },{
        icon: getAssetUrl("/course_page_icons/teacher_review.svg"),
        title: "4.87 értékelés"
    },{
        icon: getAssetUrl("/course_page_icons/teacher_award.svg"),
        title: "mester tanár"
    }]

    const TeacherDetailItem = (props: {
        icon: string,
        title: string
    }) => {
        return <Flex w={160} mx={20} alignItems={"center"}>
            <img style={{
                width: 30
            }} src={props.icon} alt={""} />
            <Typography style={{
                marginLeft: 5
            }}>{props.title}</Typography>
        </Flex>
    }

    return <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>
        <EpistoHeader text={"Az oktatóról"} my={10} />
        <Flex
            h={140}
            alignItems={"center"}>
            <Flex w={120}
                  h={120}
                  mx={10}
                  className={"circle"}
                  border="2px solid var(--epistoTeal)"
                  bg="var(--deepBlue)"
                  color="white"
                  alignItems={"center"}
                  justifyContent={"center"}>
                <Typography>
                    OM
                </Typography>
            </Flex>
            <Flex flexDir={"column"}>
                <Typography style={{
                    fontWeight: "bold",
                    fontSize: "0.9em"
                }}>
                    Oláh Mihály
                </Typography>
                <Typography style={{
                    fontSize: "0.8em"
                }}>
                    Irodai alkalmazások, történelem
                </Typography>
            </Flex>

        </Flex>
        <Flex h={70} justifyContent={"space-between"}>
            {mockTeacherDetails.map(detail => <TeacherDetailItem icon={detail.icon} title={detail.title} />)}
        </Flex>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.

            Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus. Donec porttitor, sem vitae posuere lacinia, mauris libero sagittis dui, non viverra purus lectus ut urna. Pellentesque semper, eros ac maximus vehicula, orci odio tempor magna, vel rutrum nisi nisl id mauris. Cras ullamcorper lacus elementum venenatis feugiat. Donec magna dui, vulputate ac massa ut, placerat imperdiet mauris. Fusce pellentesque ipsum nunc, eu lobortis libero porttitor id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tempor euismod erat, finibus commodo felis mollis a. Ut rhoncus convallis sem, in varius tortor dapibus et. Donec ultricies accumsan neque, eget bibendum ante fringilla sed.
        </Typography>
        <Flex h={70} w={"100%"} alignItems={"center"} justifyContent={"center"}>
            <EpistoButton variant={"outlined"}>
                Mihály további kurzusai
            </EpistoButton>
        </Flex>
    </Flex>
}
