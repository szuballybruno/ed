import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useEditExamData } from "../../../services/examService";
import { LoadingFrame } from "../../HOC/LoadingFrame"
import { EpistoEntry } from "../../universal/EpistoEntry";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { AdminSubpageHeader } from "../AdminSubpageHeader"
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

export const EditExamSubpage = () => {

    const params = useParams<{ examId: string }>();
    const examId = parseInt(params.examId);

    const { examEditData, examEditDataError, examEditDataState } = useEditExamData(examId);
    const questions = examEditData?.questions ?? [];

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {

        if (!examEditData)
            return;

        setTitle(examEditData.title);
        setTitle(examEditData.subTitle);
    }, [examEditData]);

    return <LoadingFrame
        loadingState={examEditDataState}
        error={examEditDataError}>

        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.editCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.editExamRoute,
            ]}>

            <EpistoEntry
                label="Cim"
                value={title}
                setValue={setTitle} />

            <EpistoEntry
                label="Alcim"
                value={subtitle}
                setValue={setSubtitle} />

            <FlexList className="dividerBorderTop">
                {questions
                    .map(question => <FlexListItem
                        thumbnailContent={<LiveHelpIcon className="square40" />}
                        midContent={<EpistoEntry
                            value={question.questionText} />} />)}
            </FlexList>
        </AdminSubpageHeader>
    </LoadingFrame>
}