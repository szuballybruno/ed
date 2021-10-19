import { Image } from '@chakra-ui/image';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useExamResults } from '../../services/examService';
import { useNavigation } from '../../services/navigatior';
import { EpistoHeader } from '../EpistoHeader';
import { SignupWrapper } from '../signup/SignupWrapper';
import { EpistoButton } from '../universal/EpistoButton';
import { FlexFloat } from '../universal/FlexFloat';

export const ExamResults = (props: {
    answerSessionId: number,
    examTitle: string
}) => {

    const { answerSessionId, examTitle } = props;

    // exam result fetching
    const { examResults } = useExamResults(answerSessionId);
    const questions = examResults?.questions ?? [];
    const { navigate } = useNavigation();
    const shouldShowCourseCompleted = examResults?.shouldShowCourseCompleted;

    return <SignupWrapper
        title={examTitle}
        description={<Typography
            style={{ color: examResults?.isSuccessful ? "var(--mildGreen)" : "var(--mildRed)" }}>
            {examResults?.isSuccessful ? "Sikeresen elvegezve!" : "Ez most nem jott ossze!"}
        </Typography >}
        upperTitle="Összegzés" >

        {/* course end */}
        {shouldShowCourseCompleted && <FlexFloat justify="flex-end" direction="column" border="2px solid var(--epistoTeal)" m="30px 0 30px 0">
            <EpistoHeader
                text="Gratulalunk, elvegezted a kurzust!"
                alignSelf="center">

            </EpistoHeader>

            <Image
                src="https://cdn2.iconfinder.com/data/icons/checkmarks/48/1651_Check_mark_ok_finished_completed_badge_trophy-512.png"
                height="200px"
                objectFit="contain"
                margin="20px" />

            <EpistoButton
                style={{ alignSelf: "center", margin: "20px" }}
                variant="colored"
                onClick={() => navigate(applicationRoutes.availableCoursesRoute.route)}>
                Vissza a kurzusokhoz
            </EpistoButton>
        </FlexFloat>}

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Kérdés</TableCell>
                    <TableCell align="right">Adott válasz</TableCell>
                    <TableCell align="right">Helyes válasz</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {questions
                    .map((question) => (
                        <TableRow key={question.text}>
                            <TableCell component="th" scope="row">
                                {question.text}
                            </TableCell>
                            <TableCell align="right">{question.answerText}</TableCell>
                            <TableCell align="right">{question.correctAnswerText}</TableCell>
                            <TableCell
                                align="right"
                                style={{ color: question.isCorrect ? "var(--mildGreen)" : "var(--mildRed)" }}>
                                {question.isCorrect ? "Jo valasz" : "Helytelen valasz"}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </SignupWrapper >
}