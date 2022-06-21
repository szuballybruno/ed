import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { formatSeconds } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { ChipSmall } from '../ChipSmall';
import { QuestionEditGridLogicType } from './QuestionEditGridLogic';
import { RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridColumns = (logic: QuestionEditGridLogicType) => {

    const { removeQuestion, showTiming, getPlayedSeconds, mutateQuestion, mutatedQuestions } = logic;

    const columns = useMemo((): GridColumnType<RowSchema, string, any>[] => {

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
                field: 'questionText',
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
                }
            } as GridColumnType<RowSchema, string, 'questionText'>,

            // buttons
            {
                headerName: '',
                field: 'rowKey',
                width: 90,
                renderCell: ({ row }) => {

                    const currentAnswer = row.isQuestionHeader
                        ? null
                        : mutatedQuestions
                            .single(x => x.questionVersionId === row.questionEditDTO.questionVersionId)
                            .answers
                            .single(x => x.answerVersionId === row.answerVersionId);

                    return <Flex>

                        {/* delete question */}
                        {row.isQuestionHeader && <EpistoButton
                            onClick={() => removeQuestion(row.questionVersionId)}>

                            <EpistoIcons.Delete />
                        </EpistoButton>}

                        {/* delete answer */}
                        {!row.isQuestionHeader && <EpistoButton>
                            <EpistoIcons.DeleteOutline />
                        </EpistoButton>}

                        {/* add */}
                        {row.isQuestionHeader && <EpistoButton>
                            <EpistoIcons.Add />
                        </EpistoButton>}

                        {/* is correct */}
                        {!row.isQuestionHeader && <EpistoCheckbox
                            value={!!currentAnswer?.isCorrect}
                            setValue={(isCorrect) => mutateQuestion({
                                key: row.questionEditDTO.questionVersionId,
                                field: 'answers',
                                newValue: [...mutatedQuestions
                                    .single(x => x.questionVersionId === row.questionEditDTO.questionVersionId)
                                    .answers]
                                    .map(x => {

                                        if (x.answerVersionId === row.answerVersionId)
                                            x.isCorrect = isCorrect;

                                        return x;
                                    })
                            })} />}
                    </Flex>;
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
    }, [removeQuestion, getPlayedSeconds]);

    return {
        columns
    };
};