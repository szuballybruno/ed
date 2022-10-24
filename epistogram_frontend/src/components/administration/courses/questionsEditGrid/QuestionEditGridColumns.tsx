import { useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { Id } from '../../../../shared/types/versionId';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { formatSeconds } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGridColumnBuilder, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFlex, EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoSelect } from '../../../controls/EpistoSelect';
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
        deleteAnswer,
        modules,
        showQuestionModuleSelector
    } = logic;

    const columns = useMemo((): GridColumnType<RowSchema, string, any>[] => new EpistoDataGridColumnBuilder<RowSchema, string>()

        // question header chip   
        .add({
            headerName: '',
            field: 'isQuestionHeader',
            renderCell: ({ value }) => {

                return value
                    ? <ChipSmall text='Question' />
                    : <></>;
            }
        })

        // question text
        .add({
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
                    : <EpistoFlex2>
                        <EpistoFont margin={{ left: 'px20' }}>
                            {row.text}
                        </EpistoFont>
                    </EpistoFlex2>;
            },
            editHandler: ({ value, row }) => row.isQuestionHeader
                ? mutateQuestion({
                    key: row.questionVersionId,
                    field: 'questionText',
                    newValue: value
                })
                : mutateAnswer({
                    key: row.answerVersionId!,
                    field: 'text',
                    newValue: value
                }),
        })

        // module 
        .addIf(showQuestionModuleSelector, {
            field: 'moduleVersionId',
            headerName: 'Module',
            width: 200,
            renderCell: ({ row, value }) => row.isQuestionHeader
                ? (
                    <EpistoSelect
                        items={modules}
                        getCompareKey={x => x.moduleVersionId + ''}
                        getDisplayValue={x => x.name}
                        currentKey={value + ''}
                        onSelected={x => mutateQuestion({
                            key: row.questionVersionId,
                            field: 'moduleVersionId',
                            newValue: x.moduleVersionId
                        })} />
                )
                : <></>
        })

        // buttons
        .add({
            headerName: '',
            field: 'rowKey',
            width: 90,
            renderCell: ({ row }) => {

                return <EpistoFlex2>

                    {/* delete question */}
                    {row.isQuestionHeader && <EpistoButton
                        onClick={() => removeQuestion(row.questionVersionId)}>

                        <EpistoIcons.Delete />
                    </EpistoButton>}

                    {/* delete answer */}
                    {!row.isQuestionHeader && <EpistoButton
                        onClick={() => {

                            deleteAnswer(row.answerVersionId!);
                        }}>

                        <EpistoIcons.DeleteOutline />
                    </EpistoButton>}

                    {/* create answer */}
                    {row.isQuestionHeader && <EpistoButton
                        onClick={() => {

                            const newId = Id
                                .create<'AnswerVersion'>(getVirtualId());

                            createAnswer(newId, {
                                answerVersionId: newId,
                                isCorrect: false,
                                text: '',
                                questionVersionId: row.questionVersionId
                            });
                        }}>
                        <EpistoIcons.Add />
                    </EpistoButton>
                    }

                    {/* is correct */}
                    {!row.isQuestionHeader && <EpistoCheckbox
                        value={row.isCorrect!}
                        setValue={(isCorrect) => {

                            mutateAnswer({
                                key: row.answerVersionId!,
                                field: 'isCorrect',
                                newValue: isCorrect
                            });
                        }} />}
                </EpistoFlex2 >;
            }
        })

        // show up seconds 
        .addIf(!!showTiming, {
            headerName: '',
            field: 'questionShowUpTimeSeconds',
            width: 140,
            renderCell: ({ row }) => {
                return row.isQuestionHeader
                    ? <EpistoFlex2>

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
                    </EpistoFlex2>
                    : <></>;
            }
        })
        .getColumns(),
        [
            showTiming,
            removeQuestion,
            getPlayedSeconds,
            mutateQuestion,
            mutateAnswer,
            createAnswer,
            deleteAnswer,
            modules,
            showQuestionModuleSelector
        ]);

    return {
        columns
    };
};