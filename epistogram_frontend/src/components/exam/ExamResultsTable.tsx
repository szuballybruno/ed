import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useExamResults } from '../../services/examService';
import { SignupWrapper } from '../signup/SignupWrapper';

export const ExamResultsTable = (props: {
    answerSessionId: number,
    examTitle: string
}) => {

    const { answerSessionId, examTitle } = props;

    // exam result fetching
    const { examResults, examResultsError, examResultsState } = useExamResults(answerSessionId);
    const questions = examResults?.questions ?? [];

    return <SignupWrapper
        title={examTitle}
        description={<Typography
            style={{ color: examResults?.isSuccessful ? "var(--mildGreen)" : "var(--mildRed)" }}>
            {examResults?.isSuccessful ? "Sikeresen elvegezve!" : "Ez most nem jott ossze!"}
        </Typography >}
        upperTitle="Összegzés" >

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