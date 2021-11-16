import {Flex} from "@chakra-ui/react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {getAssetUrl} from "../../frontendHelpers";
import React from "react";

export const CourseDetailsContentSection = () => {
    return <Flex direction={"column"} mt={10}>
        <Accordion expanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Bemutatkozás</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Flex h={65} w={"100%"}>
                    <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>


                        <img src={getAssetUrl("/course_page_icons/curriculum_video.svg")} alt={""} style={{
                            width: 60,
                            height: 60
                        }} />
                    </Flex>
                    <Flex ml={5} h={65} flex={1} mx={10} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontSize={12} fontWeight={"bold"}>Tanulási élmény</Typography>
                        <Typography fontSize={12}>2:43</Typography>
                    </Flex>
                </Flex>
                <Flex h={65} w={"100%"}>
                    <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                        <img src={getAssetUrl("/course_page_icons/curriculum_video.svg")} alt={""} style={{
                            width: 60,
                            height: 60
                        }} />
                    </Flex>
                    <Flex ml={5} h={65} flex={1} mx={10} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontSize={12} fontWeight={"bold"}>Tanulási élmény</Typography>
                        <Typography fontSize={12}>2:43</Typography>
                    </Flex>
                </Flex>
                <Flex h={65} w={"100%"}>
                    <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                        <img src={getAssetUrl("/course_page_icons/curriculum_video.svg")} alt={""} style={{
                            width: 60,
                            height: 60
                        }} />
                    </Flex>
                    <Flex ml={5} h={65} flex={1} mx={10} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontSize={12} fontWeight={"bold"}>Tanulási élmény</Typography>
                        <Typography fontSize={12}>2:43</Typography>
                    </Flex>
                </Flex>
                <Flex h={65} w={"100%"}>
                    <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
                        <img src={getAssetUrl("/course_page_icons/curriculum_video.svg")} alt={""} style={{
                            width: 60,
                            height: 60
                        }} />
                    </Flex>
                    <Flex ml={5} h={65} flex={1} mx={10} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontSize={12} fontWeight={"bold"}>Tanulási élmény</Typography>
                        <Typography fontSize={12}>2:43</Typography>
                    </Flex>
                </Flex>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography>A program bemutatása</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header">
                <Typography>Makrók használata az Excelben</Typography>
            </AccordionSummary>
        </Accordion>
    </Flex>
}
