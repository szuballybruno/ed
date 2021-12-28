import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React from "react";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { getAssetUrl } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
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
        headerLeftItem={translatableTexts.exam.hello}
        headerCenterText={exam.title}
        showNextButton
        handleNext={startExam}
        nextButtonTitle={translatableTexts.exam.startExam}>
        <Flex direction="column" align="center">
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

                {translatableTexts.exam.greetText}
            </Typography>
        </Flex>
    </ExamLayout>
}
