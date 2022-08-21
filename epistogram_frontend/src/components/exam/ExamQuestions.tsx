import {Grid} from '@chakra-ui/layout';
import {Flex} from '@chakra-ui/react';
import {useState} from 'react';
import {useSaveExamAnswer} from '../../services/api/examApiService';
import {useShowErrorDialog} from '../../services/core/notifications';
import {ExamPlayerDataDTO} from '../../shared/dtos/ExamPlayerDataDTO';
import {Id} from '../../shared/types/versionId';
import {Environment} from '../../static/Environemnt';
import {ArrayBuilder, epochDates, usePaging} from '../../static/frontendHelpers';
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

    const [selectedAnswerIds, setSelectedAnswerIds] = useState<Id<'Answer'>[]>([]);

    const hasSelectedAnswer = selectedAnswerIds.length > 0;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());
    const abortDialog = useEpistoDialogLogic(ExamAbortDialog);
    const isLastQuestion = questionPaging.currentIndex === questions.length - 1;

    const removeFromCompletedQuestions = (questionVersionId: Id<'QuestionVersion'>) => {

        const array = [...completedQuestionIds]; // make a separate copy of the array
        const index = array.indexOf(questionVersionId);

        if (index !== -1) {
            array.splice(index, 1);
            setCompletedQuestionIds(array);
        }
    };

    const handleAnswerQuestionAsync = async () => {
        const timeElapsed = epochDates(new Date(), showUpTime);

        try {

            console.log('Saving exam answer');
            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerIds: selectedAnswerIds!,
                questionVersionId: currentQuestion.questionVersionId,
                elapsedSeconds: timeElapsed
            });
      /*      console.log('Checking if there are questions...');
            if (questions.length === 0)
                return;

            console.log('Checking if currentQuestion is completed...');
            if (completedQuestionIds.any(currentQuestion.questionVersionId))
                console.log('CurrentQuestion is completed');

            console.log('Checking if there are answers selected');
            if (selectedAnswerIds.length === 0)
                return;*/

            console.log('Checking if there are answers selected from the current question answers');
            const currentQuestionHasSelectedAnswers = currentQuestion.answers.some(x => selectedAnswerIds.includes(x.answerId));
            console.log(currentQuestionHasSelectedAnswers);



            console.log('SelectedAnswerIds. ' + JSON.stringify(selectedAnswerIds));
            if (currentQuestionHasSelectedAnswers) {
                setCompletedQuestionIds(prevState => ([...prevState, currentQuestion.questionVersionId]));
            } else {
                const removeFromCompletedQuestions = (questionVersionId: Id<'QuestionVersion'>) => {

                    const array = [...completedQuestionIds]; // make a separate copy of the array
                    const index = array.indexOf(questionVersionId);

                    if (index !== -1) {
                        array.splice(index, 1);
                        setCompletedQuestionIds(array);
                    }
                };

                removeFromCompletedQuestions(currentQuestion.questionVersionId);
            }


            setShowUpTime(new Date());
        } catch (e) {

            showError(e);
        }
    };

    const handleNextAsync = async () => {

        await handleAnswerQuestionAsync();
        questionPaging.next();
    };

    const handleBack = () => {

        questionPaging.previous();
    };

    const handleOpenDialog = () => {

        console.log(completedQuestionIds);

        const currentQuestionHasSelectedAnswers = currentQuestion.answers.some(x => selectedAnswerIds.includes(x.answerId));
        console.log('Current question has answers selected: ' + currentQuestionHasSelectedAnswers);
        const currentQuestionIsCompleted = completedQuestionIds.any(currentQuestion.questionVersionId);
        console.log('Current question is completed: ' + currentQuestionIsCompleted);

        if (!currentQuestionHasSelectedAnswers)
            removeFromCompletedQuestions(currentQuestion.questionVersionId);

        if (currentQuestionHasSelectedAnswers && !currentQuestionIsCompleted)
            setCompletedQuestionIds(prevState => ([...prevState, currentQuestion.questionVersionId]));

        abortDialog.openDialog();
    };

    const handleNextButton = async () => {

        // do nothing if exam not started
        if (!isExamInProgress)
            return;

        // if last question and answered then
        // save answer then open dialog
        if (isLastQuestion && hasSelectedAnswer) {

            await handleAnswerQuestionAsync();
            return handleOpenDialog();
        }

        // if last question and not answered then
        // open dialog without saving answer
        if (isLastQuestion && !hasSelectedAnswer) {

            return handleOpenDialog();
        }

        // if not last question and has answer selected
        // save answer and jump to next else jump without
        // saving.
        if (hasSelectedAnswer) {

            return handleNextAsync();
        } else {

            return questionPaging.next();
        }
    };

    const handleSelectCurrent = <T extends string>(id: Id<T>) => {

        const itemIndex = questions.findIndex(x => x.questionVersionId === id);
        questionPaging.setItem(itemIndex);
    };

    const setAnswerSelectedState = (answerId: Id<'Answer'>, isSelected: boolean) => {

        if (isSelected) {

            setSelectedAnswerIds([...selectedAnswerIds, answerId]);
        }
        else {

            setSelectedAnswerIds(selectedAnswerIds
                .filter(x => x !== answerId));
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
            answerSessionId={answerSessionId}
            answeredQuestionsCount={completedQuestionIds.length}
            handleAbortExam={handleAbortExam}
            onExamFinished={onExamFinished}
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
                    action: handleOpenDialog
                }
            ]}
            handleBack={handleBack}
            footerButtons={new ArrayBuilder()
                .add({
                    title: isLastQuestion
                        ? 'Vizsga befejezése'
                        : translatableTexts.exam.nextQuestion,
                    action: isLastQuestion
                        ? handleOpenDialog
                        : handleNextButton
                })
                .getArray()}
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

                                const isAnswerSelected = selectedAnswerIds
                                    .some(x => x === answer.answerId);

                                return <QuestionAnswer
                                    key={index}
                                    minWidth={400}
                                    onClick={(isSelected) => setAnswerSelectedState(answer.answerId, isSelected)}
                                    answerText={answer.answerText}
                                    isSelected={isAnswerSelected} />;
                            })}
                    </Grid>
                </Flex>
            </ExamLayoutContent>
        </ExamLayout>
    </LoadingFrame>;
};
