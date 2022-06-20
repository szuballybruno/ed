import { Flex } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { AnswerEditDTO } from '../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { GridColumnType, EpistoDataGrid } from '../../controls/EpistoDataGrid';
import { EpistoFlex } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ChipSmall } from './ChipSmall';

type RowSchema = {

    // misc
    isQuestionHeader: boolean;
    rowKey: string;

    // question fileds
    questionVersionId: number;
    questionText: string;
    questionShowUpTimeSeconds?: number;

    // ans fileds 
    answerVersionId: number;
    text: string;
    isCorrect: boolean;
};

export const QuestionsEditGrid = ({
    questions
}: {
    questions: QuestionEditDataDTO[]
}) => {

    const columns = useMemo((): GridColumnType<RowSchema, string, any>[] => {

        return [
            {
                headerName: '',
                field: 'isQuestionHeader',
                renderCell: ({ value }) => {

                    return value
                        ? <ChipSmall text="Question" />
                        : <></>;
                }
            } as GridColumnType<RowSchema, string, 'isQuestionHeader'>,
            {
                headerName: 'Question text',
                field: 'questionText',
                width: 800,
                renderCell: ({ row }) => {

                    return row.isQuestionHeader
                        ? <EpistoFlex
                            width='stretch'
                            height='stretch'
                            background="deepBlue"
                            align='center'>
                            <EpistoFont
                                margin={{ left: 'px10' }}
                                color="fontLight">
                                
                                {row.questionText}
                            </EpistoFont>
                        </EpistoFlex >
                        : <Flex>
                            <EpistoFont margin={{ left: 'px20' }}>
                                {row.text}
                            </EpistoFont>
                        </Flex>;
                }
            } as GridColumnType<RowSchema, string, 'questionText'>,
            {
                headerName: '',
                field: 'rowKey',
                renderCell: ({ row }) => {

                    return <Flex>

                        {/* delete question */}
                        {row.isQuestionHeader && <EpistoButton>
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
                            value={false}
                            setValue={() => 1} />}
                    </Flex>;
                }
            } as GridColumnType<RowSchema, string, 'rowKey'>,
        ];
    }, []);

    const questionRows = useMemo((): RowSchema[] => {

        if (questions.length === 0)
            return [];

        return questions
            .flatMap((question): RowSchema[] => {

                const headerRow = {
                    isQuestionHeader: true,
                    rowKey: `${question.questionVersionId}`,
                    questionShowUpTimeSeconds: question.questionShowUpTimeSeconds,
                    questionText: question.questionText,
                    questionVersionId: question.questionVersionId
                } as RowSchema;

                const answerRows = question
                    .answers
                    .map((answer): Partial<RowSchema> => ({
                        isQuestionHeader: false,
                        rowKey: `${question.questionVersionId}-${answer.answerVersionId}`,
                        answerVersionId: answer.answerVersionId,
                        isCorrect: answer.isCorrect,
                        text: answer.text
                    })) as RowSchema[];

                return [headerRow, ...answerRows];
            });
    }, [questions]);

    console.log(questionRows);

    const getKey = useCallback(x => x.rowKey, []);

    return (
        <EpistoDataGrid
            hideFooter
            columns={columns}
            rows={questionRows}
            getKey={getKey} />
    );
};