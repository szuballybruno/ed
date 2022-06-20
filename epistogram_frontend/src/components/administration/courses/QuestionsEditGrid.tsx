import { Flex } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { getVirtualId } from '../../../services/core/idService';
import { AnswerEditDTO } from '../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { formatSeconds, formatTimespan, iterate } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { GridColumnType, EpistoDataGrid } from '../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { useXListMutator } from '../../lib/XMutator/XMutator';
import { ChipSmall } from './ChipSmall';

type EditQuestionFnType = <TField extends keyof QuestionEditDataDTO, >(key: number, field: TField, value: QuestionEditDataDTO[TField]) => void;

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
    questions,
    showTiming,
    getPlayedSeconds
}: {
    questions: QuestionEditDataDTO[],
    showTiming?: boolean,
    getPlayedSeconds?: () => number
}) => {

    const {
        mutatedData: mutatedQuestions,
        add: addQuestion,
        mutate: mutateQuestion,
        remove: removeQuestion,
        isMutated: isQuestionModified,
        isAnyMutated: isAnyQuestionsMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<QuestionEditDataDTO, 'questionVersionId', number>(questions, 'questionVersionId', () => console.log(''));

    console.log(mutations);

    //
    // add question
    const handleAddQuestion = useCallback(() => {

        const answers = iterate(4, (index): AnswerEditDTO => ({
            answerVersionId: getVirtualId(),
            text: '',
            isCorrect: false
        }));

        const question: QuestionEditDataDTO = {
            questionVersionId: getVirtualId(),
            questionText: '',
            questionShowUpTimeSeconds: 0,
            answers
        };

        addQuestion(question.questionVersionId, question);
    }, [addQuestion]);

    //
    // columns
    const columns = useMemo((): GridColumnType<RowSchema, string, any>[] => {

        let cols: GridColumnType<RowSchema, string, any>[] = [

            // question header chip
            {
                headerName: '',
                field: 'isQuestionHeader',
                renderCell: ({ value }) => {

                    return value
                        ? <ChipSmall text="Question" />
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

    //
    // rows
    const questionRows = useMemo((): RowSchema[] => {

        if (mutatedQuestions.length === 0)
            return [];

        return mutatedQuestions
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
    }, [mutatedQuestions]);

    //
    // get key
    const getKey = useCallback(x => x.rowKey, []);

    return (
        <EpistoFlex
            flex="1"
            direction="vertical">

            {/* heder */}
            <EpistoFlex
                margin={{ all: 'px5' }}
                justify="flex-end">

                <EpistoButton
                    onClick={handleAddQuestion}>

                    <EpistoIcons.Add />
                    Add question
                </EpistoButton>
            </EpistoFlex>

            {/* grid */}
            <EpistoDataGrid
                hideFooter
                columns={columns}
                rows={questionRows}
                getKey={getKey} />
        </EpistoFlex>
    );
};