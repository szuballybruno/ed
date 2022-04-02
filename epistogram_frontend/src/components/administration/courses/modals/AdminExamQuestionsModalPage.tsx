import { Flex } from '@chakra-ui/react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';


export const AdminExamQuestionsModalPage = () => {
    const questions = [{
        questionTitle: 'asd',
        answers: [{
            title: 'Válasz 1',
            isCorrect: false
        }, {
            title: 'Válasz 2',
            isCorrect: false
        }, {
            title: 'Válasz 3',
            isCorrect: true
        }, {
            title: 'Válasz 4',
            isCorrect: false
        }]
    }];

    return <Flex flex="1"
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
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
      rows.slice().sort(getComparator(order, orderBy)) */}
                    {questions.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                            >
                                <TableCell
                                    width={350}
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.questionTitle}
                                </TableCell>
                                {row.answers.map((answer, index) => {
                                    return <TableCell
                                        key={index}
                                        style={{
                                            color: answer.isCorrect
                                                ? 'var(--deepGreen)'
                                                : 'var(--intenseRed)'
                                        }}>

                                        <Checkbox
                                            checked={answer.isCorrect}
                                            style={{
                                                color: answer.isCorrect
                                                    ? 'var(--deepGreen)'
                                                    : 'var(--intenseRed)'
                                            }} />

                                        {answer.title}
                                    </TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table >
        </TableContainer >
    </Flex >;
};
