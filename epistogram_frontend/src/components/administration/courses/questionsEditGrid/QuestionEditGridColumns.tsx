import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { clone, formatSeconds } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { ChipSmall } from '../ChipSmall';
import { QuestionEditGridLogicType } from './QuestionEditGridLogic';
import { RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridColumns = (logic: QuestionEditGridLogicType) => {

    const {
        showTiming,
        removeQuestion,
        getPlayedSeconds,
        mutateQuestion,
        mutateAnswer,
        createAnswer,
        deleteAnswer
    } = logic;

    const columns = useMemo((): GridColumnType<RowSchema, string, any>[] => {

        console.log('rendering columns!');

        let cols: GridColumnType<RowSchema, string, any>[] = [

            // question header chip
            {
                headerName: '',
                field: 'isQuestionHeader',
                renderCell: ({ value }) => {

                    return value
                        ? <ChipSmall text='Question' />
                        : <></>;
                }
            } as GridColumnType<RowSchema, string, 'isQuestionHeader'>,

            // question text
            {
                headerName: 'Question text',
                field: 'itemText',
                width: 700,
                renderCell: ({ row }) => {

                    return row.isQuestionHeader
                        ? <EpistoFlex
                            width='stretch'
                            height='stretch'
                            background='deepBlue'
                            align='center'>
                            <EpistoFont
                                margin={{ left: 'px10' }}
                                color='fontLight'>

                                {row.questionText}
                            </EpistoFont>
                        </EpistoFlex>
                        : <Flex>
                            <EpistoFont margin={{ left: 'px20' }}>
                                {row.text}
                            </EpistoFont>
                        </Flex>;
                },
                editHandler: ({ value, row }) => row.isQuestionHeader
                    ? mutateQuestion({
                        key: row.questionVersionId,
                        field: 'questionText',
                        newValue: value
                    })
                    : mutateAnswer({
                        key: row.answerVersionId,
                        field: 'text',
                        newValue: value
                    }),
            } as GridColumnType<RowSchema, string, 'itemText'>,

            // buttons
            {
                headerName: '',
                field: 'rowKey',
                width: 90,
                renderCell: ({ row }) => {

                    return <Flex>

                        {/* delete question */}
                        {row.isQuestionHeader && <EpistoButton
                            onClick={() => removeQuestion(row.questionVersionId)}>

                            <EpistoIcons.Delete />
                        </EpistoButton>}

                        {/* delete answer */}
                        {!row.isQuestionHeader && <EpistoButton
                            onClick={() => {

                                deleteAnswer(row.answerVersionId);
                            }}>

                            <EpistoIcons.DeleteOutline />
                        </EpistoButton>}

                        {/* create answer */}
                        {row.isQuestionHeader && <EpistoButton
                            onClick={() => {

                                const newId = getVirtualId();

                                createAnswer(newId, {
                                    answerVersionId: newId,
                                    isCorrect: false,
                                    text: ''
                                });
                            }}>
                            <EpistoIcons.Add />
                        </EpistoButton>
                        }

                        {/* is correct */}
                        {!row.isQuestionHeader && <EpistoCheckbox
                            value={row.isCorrect}
                            setValue={(isCorrect) => {

                                mutateAnswer({
                                    key: row.answerVersionId,
                                    field: 'isCorrect',
                                    newValue: isCorrect
                                });
                            }} />}
                    </Flex >;
                }
            } as GridColumnType<RowSchema, string, 'rowKey'>,
        ];

        if (showTiming) {

            const timingCol = {
                headerName: '',
                field: 'questionShowUpTimeSeconds',
                width: 140,
                renderCell: ({ row }) => {
                    return row.isQuestionHeader
                        ? <Flex>

                            {/* timer secs */}
                            <EpistoFont>
                                {formatSeconds(row.questionShowUpTimeSeconds!)}
                            </EpistoFont>

                            {/* timer butt */}
                            {showTiming && row.isQuestionHeader && <EpistoButton
                                onClick={() => {

                                    if (!getPlayedSeconds)
                                        return;

                                    mutateQuestion({
                                        key: row.questionVersionId,
                                        field: 'questionShowUpTimeSeconds',
                                        newValue: getPlayedSeconds()
                                    });
                                }}>
                                <EpistoIcons.Timer />
                            </EpistoButton>}
                        </Flex>
                        : <></>;
                }
            } as GridColumnType<RowSchema, string, 'questionShowUpTimeSeconds'>;

            cols = [...cols, timingCol];
        }

        return cols;
    }, [getPlayedSeconds, mutateQuestion, ]);

    return {
        columns
    };
};