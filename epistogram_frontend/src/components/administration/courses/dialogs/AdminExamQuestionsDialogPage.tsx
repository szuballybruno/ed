import { Flex } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { LoadingStateType } from '../../../../models/types';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { AdminExamQuestionRow } from '../AdminExamQuestionRow';
import { EditQuestionFnType } from '../VideoEditDialog';

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
                }}>

                Kérdés
            </Flex>

            <Flex
                flex={getColumnCountFromAnswers(questions)}
                align='center'
                fontWeight='bold'>

                Válaszok
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
