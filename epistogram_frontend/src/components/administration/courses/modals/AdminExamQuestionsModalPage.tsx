import { Flex } from '@chakra-ui/react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoEntryNew } from '../../../controls/EpistoEntryNew';
import { EditQuestionFnType, QuestionSchema } from '../VideoEditDialog';


export const AdminExamQuestionsModalPage = (props: {
    questions: QuestionSchema[],
    handleAddQuestion: () => void,
    handleMutateQuestion: EditQuestionFnType,
    handleSaveQuestions: () => void,
    isAnyQuestionsMutated: boolean
}) => {

    const {
        questions,
        handleAddQuestion,
        handleMutateQuestion,
        handleSaveQuestions,
        isAnyQuestionsMutated
    } = props;

    return <Flex
        flex="1"
        p="20px">

        <TableContainer
            className="roundBorders largeSoftShadow"
            style={{
                minHeight: '100%',
                padding: '0 20px',
                background: 'var(--transparentWhite90)'
            }}>

            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >

                <TableHead>

                    <TableRow>

                        <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            style={{
                                fontWeight: 'bold'
                            }}
                        >

                            Kérdés
                        </TableCell>

                        <TableCell
                            colSpan={4}
                            style={{
                                fontWeight: 'bold'
                            }}>

                            Válaszok
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {questions
                        .map((row, index) => {

                            const labelId = `enhanced-table-checkbox-${index}`;

                            return <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}>

                                <TableCell
                                    width={350}
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none">

                                    {row.questionText}
                                </TableCell>

                                {row.answers
                                    .map((answer, index) => {

                                        return <TableCell
                                            key={index}
                                            style={{
                                                backgroundColor: 'orange',
                                                color: answer.isCorrect
                                                    ? 'var(--deepGreen)'
                                                    : 'var(--intenseRed)'
                                            }}>

                                            <Flex
                                                background='pink'
                                                h='100%'
                                                minH='100%'
                                                align='flex-start'>

                                                <Checkbox
                                                    checked={answer.isCorrect}
                                                    style={{
                                                        color: answer.isCorrect
                                                            ? 'var(--deepGreen)'
                                                            : 'var(--intenseRed)'
                                                    }} />

                                                <EpistoEntry
                                                    height='100%'
                                                    value={answer.text}
                                                    isMultiline />
                                            </Flex>
                                        </TableCell>;
                                    })}
                            </TableRow>;

                        })}
                </TableBody>
            </Table >
        </TableContainer >
    </Flex >;
};
