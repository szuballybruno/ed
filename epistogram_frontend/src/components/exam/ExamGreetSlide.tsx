import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from "react";
import { getAssetUrl, PagingType } from "../../frontendHelpers";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { ExamLayout } from "./ExamLayout";

export const ExamGreetSlide = (props: {
    exam: ExamDTO,
    startExam: () => void
}) => {

    const {
        exam,
        startExam
    } = props;

    return <ExamLayout
        headerLeftText="Udv!"
        headerCenterText={exam.title}
        content={<Flex direction="column" align="center">
            <img
                src={getAssetUrl("/images/examCover.jpg")}
                alt={""}
                style={{
                    objectFit: "contain",
                    maxHeight: 300
                }} />

            <Typography
                className="fontHuge">

                {exam.title}
            </Typography>

            <Typography
                style={{
                    padding: "30px",
                    maxWidth: "400px"
                }}>

                Keszulj fel, ha a kezdes gombra kattintasz a vizsga elindul.
            </Typography>
        </Flex>}
        showNextButton
        handleNext={startExam}
        nextButtonTitle="Kezdes!" />
}
