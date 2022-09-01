import {Grid} from '@chakra-ui/layout';
import {Flex} from '@chakra-ui/react';
import {useState} from 'react';
import {useSaveExamAnswer} from '../../services/api/examApiService';
import {useShowErrorDialog} from '../../services/core/notifications';
import {ExamPlayerDataDTO} from '../../shared/dtos/ExamPlayerDataDTO';
import {Id} from '../../shared/types/versionId';
import {Environment} from '../../static/Environemnt';
import {epochDates, usePaging} from '../../static/frontendHelpers';
import {translatableTexts} from '../../static/translatableTexts';
import {EpistoFont} from '../controls/EpistoFont';
import {LoadingFrame} from '../system/LoadingFrame';
import {useEpistoDialogLogic} from '../universal/epistoDialog/EpistoDialogLogic';
import {ExamAbortDialog} from './ExamAbortDialog';
import {ExamLayout} from './ExamLayout';
import {ExamLayoutContent} from './ExamLayoutContent';
import {QuestionAnswer} from './QuestionAnswer';

export const ExamQuestions = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    onExamFinished: () => void,
    handleAbortExam: () => void
    isExamInProgress: boolean
    hideLoading?: boolean

}) => {

    const {
        answerSessionId,
        onExamFinished,
        handleAbortExam,
        exam,
        hideLoading,
        isExamInProgress
    } = props;

    const {
        questions
    } = exam;

    const questionPaging = usePaging({
        items: questions,
        onNextOverNavigation: onExamFinished
    });

    const [completedQuestionIds, setCompletedQuestionIds] = useState<Id<'QuestionVersion'>[]>([]);

    const showError = useShowErrorDialog();
    const { saveExamAnswer, saveExamAnswerState } = useSaveExamAnswer();
    const currentQuestion = questionPaging.currentItem!;

    const [selectedAnswerVersionIds, setSelectedAnswerVersionIds] = useState<{
        answerVersionId: Id<'AnswerVersion'>,
        questionVersionId: Id<'QuestionVersion'>
    }[]>([]);

    const hasSelectedAnswer = selectedAnswerVersionIds.length > 0;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());
    const abortDialog = useEpistoDialogLogic(ExamAbortDialog);
    const isLastQuestion = questionPaging.currentIndex === questions.length - 1;

    const removeCompletedQuestion = (questionVersionId: Id<'QuestionVersion'>) => {

        setCompletedQuestionIds(completedQuestionIds
            .filter(x => x !== questionVersionId));
    };

    const addCompletedQuestion = (questionVersionId: Id<'QuestionVersion'>) => {

        setCompletedQuestionIds([...completedQuestionIds, questionVersionId]);
    };

    const handleOpenAbortDialog = () => {

        abortDialog.openDialog();
    };

    /**
     * Answers a question.
     * Saves the answer to client side state,
     * and also sends it to the server.
     * TODO: This is a known bug, should be fixed.
     */
    const handleAnswerQuestionAsync = async () => {

        try {

            // get elapsed time
            const timeElapsed = epochDates(new Date(), showUpTime);

            const questionVersionId = currentQuestion
                .questionVersionId;

            const anyAnswersSelected = currentQuestion
                .answers
                .map(x => selectedAnswerVersionIds
                    .some(y => y.answerVersionId === x.answerVersionId));

            // TODO this will definitely cause bugs in the future
            // answered questions state should come from the server
            // selected any answers
            if (anyAnswersSelected) {

                addCompletedQuestion(questionVersionId);

                // Important, that it only sends the answers for the current question!
                await saveExamAnswer({
                    answerSessionId: answerSessionId,
                    answerVersionIds: selectedAnswerVersionIds
                        .filter(x => x.questionVersionId === questionVersionId)
                        .map(x => x.answerVersionId),
                    questionVersionId,
                    elapsedSeconds: timeElapsed
                });
            }

            // no answers are selected
            else {

                removeCompletedQuestion(questionVersionId);
            }
        }
        catch (e) {

            showError(e);
        }
        finally {

            // clear show up time
            setShowUpTime(new Date());
        }
    };

    const handleBack = () => {

        questionPaging.previous();
    };

    const handleNextAsync = async () => {

        if (!isExamInProgress)
            return;

        await handleAnswerQuestionAsync();

        isLastQuestion
            ? handleOpenAbortDialog()
            : questionPaging.next();
    };

    const handleAbortAsync = async () => {

        if (!isExamInProgress)
            return;

        await handleAnswerQuestionAsync();
        handleOpenAbortDialog();
    };

    const handleSelectCurrent = <T extends string>(id: Id<T>) => {

        const itemIndex = questions.findIndex(x => x.questionVersionId === id);
        questionPaging.setItem(itemIndex);
    };

    const setAnswerSelectedState = (
        answerVersionId: Id<'AnswerVersion'>,
        questionVersionId: Id<'QuestionVersion'>,
        isSelected: boolean
    ) => {

        if (isSelected) {

            setSelectedAnswerVersionIds([...selectedAnswerVersionIds, {answerVersionId, questionVersionId}]);
        }
        else {

            setSelectedAnswerVersionIds(selectedAnswerVersionIds
                .filter(x => x.answerVersionId !== answerVersionId));
        }
    };

    return <LoadingFrame
        loadingState={hideLoading ? undefined : saveExamAnswerState}
        flex="1"
        direction={'column'}
        alignItems={'center'}
        width="100%">

        {/* abort dialog */}
        <ExamAbortDialog
            dialogLogic={abortDialog}
            answeredQuestionsCount={completedQuestionIds.length}
            handleAbortExam={handleAbortExam}
            handleExamFinished={onExamFinished}
            questions={questions} />

        <ExamLayout
            headerLeftItem={(
                <Flex align="center">
                    <img
                        alt=""
                        src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                        className="square35" />

                    <EpistoFont style={{ marginLeft: '10px' }}>
                        {questions.length}/{questionPaging.currentIndex + 1}
                    </EpistoFont>
                </Flex>
            )}
            stepperLogic={{
                ids: questions.map(x => x.questionVersionId),
                currentId: currentQuestion.questionVersionId,
                completedIds: completedQuestionIds,
                selectCurrentHandler: handleSelectCurrent
            }}
            headerCenterText={exam.title}
            headerButtons={[
                {
                    title: 'Vizsga befejezése',
                    action: handleAbortAsync
                }
            ]}
            handleBack={handleBack}
            footerButtons={[
                {
                    title: isLastQuestion
                        ? 'Vizsga befejezése'
                        : translatableTexts.exam.nextQuestion,
                    action: handleNextAsync
                }
            ]}
            isFirst={questionPaging.currentIndex === 0}>

            <ExamLayoutContent
                title={currentQuestion.questionText}>

                    {/* answers */}
                <Flex
                    direction={'row'}
                    justifyContent={'center'}
                    pt={10}
                    width="100%">

                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gridAutoRows="minmax(0,1fr)"
                        gridGap="10px">

                        {currentQuestion
                            .answers
                            .map((answer, index) => {

                                const isAnswerSelected = selectedAnswerVersionIds
                                    .some(x => x.answerVersionId === answer.answerVersionId);

                                return <QuestionAnswer
                                    key={index}
                                    minWidth={400}
                                    onClick={(isSelected) => setAnswerSelectedState(answer.answerVersionId, currentQuestion.questionVersionId, isSelected)}
                                    answerText={answer.answerText}
                                    isSelected={isAnswerSelected} />;
                            })}
                    </Grid>
                </Flex>
            </ExamLayoutContent>
        </ExamLayout>
    </LoadingFrame>;
};
