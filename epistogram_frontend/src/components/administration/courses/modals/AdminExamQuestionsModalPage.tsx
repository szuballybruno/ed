import { Flex } from '@chakra-ui/react';
import { Add, Delete } from '@mui/icons-material';
import { Checkbox, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClassBuilder } from '../../../../helpers/classBuilder';
import { LoadingStateType } from '../../../../models/types';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { EditQuestionFnType, QuestionSchema } from '../VideoEditDialog';

export const AdminExamQuestionRow = (props: {
    rowIndex: number,
    question: QuestionEditDataDTO,
    handleMutateQuestion: EditQuestionFnType,
    columnCount: number
}) => {
    const {
        rowIndex,
        question,
        handleMutateQuestion,
        columnCount
    } = props;

    return <Flex
        flex='1'
        maxH='fit-content'
        key={rowIndex} >

        <Flex
            className={new ClassBuilder()
                .custom('dividerBorderBottom')
                .if(rowIndex === 0, 'dividerBorderTop')
                .build()}
            flex="1"
            width='100%'
            px='10px'
            align='center'>

            <EpistoEntry
                style={{
                    width: '100%',
                    margin: '10px 0'
                }}
                isMultiline
                value={question.questionText}
                setValue={(questionText) => {
                    handleMutateQuestion(question.questionId, 'questionText', questionText);
                }} />
        </Flex>

        <Flex flex={columnCount}>
            {question.answers
                .map((answer, answerIndex) => {

                    return <Flex
                        className={new ClassBuilder()
                            .custom('dividerBorderBottom')
                            .if(rowIndex === 0, 'dividerBorderTop')
                            .build()}
                        flex='1'
                        p='10px 10px 10px 0'
                        key={answerIndex}
                        style={{
                            backgroundColor: 'transparent',
                            color: answer.isCorrect
                                ? 'var(--deepGreen)'
                                : 'var(--intenseRed)'
                        }}>

                        <Checkbox
                            checked={answer.isCorrect}
                            onChange={() => {
                                handleMutateQuestion(question.questionId, 'answers', question.answers.map(
                                    el => el.id === answer.id
                                        ? { ...el, isCorrect: !answer.isCorrect }
                                        : el
                                ));
                            }}
                            style={{
                                color: answer.isCorrect
                                    ? 'var(--deepGreen)'
                                    : 'var(--intenseRed)'
                            }} />

                        <EpistoEntry
                            setValue={(answerText) => {
                                handleMutateQuestion(question.questionId, 'answers', question.answers.map(
                                    el => el.id === answer.id
                                        ? { ...el, text: answerText }
                                        : el
                                ));
                            }}
                            style={{
                                margin: '10px 0',
                                width: '100%'
                            }}
                            value={answer.text}
                            isMultiline />
                    </Flex>;
                })}
        </Flex>

        <Flex
            className={new ClassBuilder()
                .custom('dividerBorderBottom')
                .if(rowIndex === 0, 'dividerBorderTop')
                .build()}
            w='40px'>

            <EpistoButton>

                <Delete />
            </EpistoButton>
        </Flex>
    </Flex>;
};


export const AdminExamQuestionsModalPage = (props: {
    questions: QuestionEditDataDTO[],
    handleAddQuestion: () => void,
    handleMutateQuestion: EditQuestionFnType,
    handleSaveQuestions: () => void,
    examQuestionEditDataState: LoadingStateType,
    examQuestionEditDataError: any,
    isAnyQuestionsMutated: boolean
}) => {

    const {
        questions,
        handleAddQuestion,
        handleMutateQuestion,
        handleSaveQuestions,
        examQuestionEditDataState,
        examQuestionEditDataError,
        isAnyQuestionsMutated
    } = props;

    const getColumnCountFromAnswers = (questions: QuestionEditDataDTO[]): number => {
        const questionWithMostAnswer = questions
            .find(x => {
                let maxLength;

                if (x.answers.length > maxLength)
                    maxLength = x.answers.length;

                return maxLength;
            });

        return questionWithMostAnswer?.answers.length || 4;
    };

    const getLoadingState = (
        examQuestionEditDataState: LoadingStateType,
        questions: QuestionEditDataDTO[]
    ): LoadingStateType => {
        if (questions.length === 0 && examQuestionEditDataState !== ('error' || 'idle'))
            return 'loading';

        return examQuestionEditDataState;
    };

    return <LoadingFrame
        loadingState={getLoadingState(examQuestionEditDataState, questions)}
        error={examQuestionEditDataError}
        flex='1'
        direction='column'
        className="roundBorders largeSoftShadow"
        justify='flex-start'
        p="20px 20px 100px 20px"
        overflowY='scroll'
        style={{
            background: 'var(--transparentWhite90)'
        }}>

        <Flex>

            <Flex
                flex="1"
                h='40px'
                align='center'
                px='11px'
                style={{
                    fontWeight: 'bold'
                }}
            >

                Kérdés
            </Flex>

            <Flex
                flex={getColumnCountFromAnswers(questions)}
                align='center'
                pl='10px'
                fontWeight='bold'>

                Válaszok
            </Flex>

            <Flex
                w='40px'
                align='center'
                pl='10px'
                fontWeight='bold'>


            </Flex>
        </Flex>

        <Flex
            flex='1'
            direction='column'
            overflowY='scroll'>

            {questions
                .map((question, index) => {

                    return <AdminExamQuestionRow
                        key={index}
                        question={question}
                        rowIndex={index}
                        handleMutateQuestion={handleMutateQuestion}
                        columnCount={getColumnCountFromAnswers(questions)} />;

                })}

            <EpistoButton
                onClick={handleAddQuestion}
                variant='outlined'
                style={{
                    flex: '1',
                    margin: '10px 0 0 0'
                }}>

                <Add />
            </EpistoButton>
            <EpistoButton
                isDisabled={!isAnyQuestionsMutated}
                onClick={handleSaveQuestions}
                variant="colored"
                style={{
                    flex: '1',
                    margin: '10px 0'
                }}>

                {translatableTexts.misc.save}
            </EpistoButton>
        </Flex>
    </LoadingFrame >;
};
