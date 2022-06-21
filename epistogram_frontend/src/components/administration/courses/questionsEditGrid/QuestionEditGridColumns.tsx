import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { clone, formatSeconds } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { ChipSmall } from '../ChipSmall';
import { QuestionEditGridLogicType } from './QuestionEditGridLogic';
import { RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridColumns = (logic: QuestionEditGridLogicType) => {

    const { removeQuestion, showTiming, getPlayedSeconds, mutateQuestion } = logic;

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
                    : mutateQuestion({
                        key: row.questionVersionId,
                        field: 'answers',
                        newValue: clone(row.questionEditDTO.answers)
                            .map(x => {

                                if (x.answerVersionId === row.answerVersionId)
                                    x.text = value;

                                return x;
                            })
                    }),
                // renderEditCell: ({ row }) => {

                //     return row.isQuestionHeader

                //         ? <EpistoEntry
                //             value={row.questionText} />

                //         : <EpistoEntry
                //             value={row.text} />;
                // }
            } as GridColumnType<RowSchema, string, 'itemText'>,

            // buttons
            {
                headerName: '',
                field: 'rowKey',
                width: 90,
                renderCell: ({ row }) => {

                    const answerDTO = row
                        .answerEditDTO;

                    const questionVersionId = row
                        .questionEditDTO
                        .questionVersionId;

                    return <Flex>

                        {/* delete question */}
                        {row.isQuestionHeader && <EpistoButton
                            onClick={() => removeQuestion(row.questionVersionId)}>

                            <EpistoIcons.Delete />
                        </EpistoButton>}

                        {/* delete answer */}
                        {!row.isQuestionHeader && <EpistoButton
                            onClick={() => {

                                mutateQuestion({
                                    key: questionVersionId,
                                    field: 'answers',
                                    newValue: clone(row.questionEditDTO.answers)
                                        .filter(x => x.answerVersionId !== answerDTO.answerVersionId)
                                });
                            }}>

                            <EpistoIcons.DeleteOutline />
                        </EpistoButton>}

                        {/* add */}
                        {row.isQuestionHeader && <EpistoButton
                            onClick={() => {

                                mutateQuestion({
                                    key: questionVersionId,
                                    field: 'answers',
                                    newValue: [...clone(row.questionEditDTO.answers), {
                                        answerVersionId: getVirtualId(),
                                        isCorrect: false,
                                        text: ''
                                    }]
                                });
                            }}>
                            <EpistoIcons.Add />
                        </EpistoButton>}

                        {/* is correct */}
                        {!row.isQuestionHeader && <EpistoCheckbox
                            value={!!answerDTO?.isCorrect}
                            setValue={(isCorrect) => {

                                mutateQuestion({
                                    key: questionVersionId,
                                    field: 'answers',
                                    newValue: clone(row.questionEditDTO.answers)
                                        .map(x => {

                                            if (x.answerVersionId === row.answerVersionId)
                                                x.isCorrect = isCorrect;

                                            return x;
                                        })
                                });
                            }} />}
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
    }, []);

    return {
        columns
    };
};