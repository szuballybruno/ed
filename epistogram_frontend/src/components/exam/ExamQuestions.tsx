import { Grid } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useCompleteExam, useSaveExamAnswer } from '../../services/api/examApiService';
import { useShowErrorDialog } from '../../services/core/notifications';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { Id } from '../../shared/types/versionId';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder, epochDates, usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { LoadingFrame } from '../system/LoadingFrame';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { ExamLayout } from './ExamLayout';
import { ExamLayoutContent } from './ExamLayoutContent';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamQuestions = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    onExamFinished: () => void,
    handleAbortExam: () => void
    hideLoading?: boolean
}) => {

    const {
        answerSessionId,
        onExamFinished,
        handleAbortExam,
        exam,
        hideLoading
    } = props;

    const questions = exam.questions;
    const [completedQuestionIds, setCompletedQuestionIds] = useState<Id<'QuestionVersion'>[]>([]);
    const showError = useShowErrorDialog();
    const { saveExamAnswer, saveExamAnswerState } = useSaveExamAnswer();
    const { completeExamAsync, completeExamState } = useCompleteExam();
    const questionPaging = usePaging({ items: questions, onNextOverNavigation: onExamFinished });
    const currentQuestion = questionPaging.currentItem!;
    const [selectedAnswerIds, setSelectedAnswerIds] = useState<Id<'Answer'>[]>([]);
    const hasSelectedAnswer = selectedAnswerIds.length > 0;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());
    const dialogLogic = useEpistoDialogLogic('exam_close_dialog');

    const handleNextAsync = async () => {

        const timeElapsed = epochDates(new Date(), showUpTime);

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerIds: selectedAnswerIds!,
                questionVersionId: currentQuestion.questionVersionId,
                elapsedSeconds: timeElapsed
            });

            setCompletedQuestionIds(prevState => ([...prevState, currentQuestion.questionVersionId]));
            setShowUpTime(new Date());
            setSelectedAnswerIds([]);
            questionPaging.next();
        } catch (e) {

            showError(e);
        }
    };

    const handleOpenDialog = () => {

        dialogLogic.openDialog();
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

        <EpistoDialog
            closeButtonType='top'
            title='Biztosan befejezed ezt a vizsgát?'
            logic={dialogLogic}>

            <Flex
                direction='column'
                p='20px'>

                <EpistoFont style={{
                    margin: '0 0 20px 0'
                }}>
                    {'A \'Befejezem\' gombra való kattintás után már nem módosíthatod a válaszaidat'}
                </EpistoFont>

                <EpistoFont style={{
                    margin: '0 0 20px 0'
                }}>
                    Átugrott kérdések száma: {questions.length - completedQuestionIds.length} db
                </EpistoFont>

                <Flex
                    my='10px'
                    flex='1'>

                    <EpistoButton
                        variant='light'
                        onClick={() => {

                            dialogLogic.closeDialog();
                            handleAbortExam();
                        }}
                        style={{
                            flex: 1,
                            background: 'var(--mildRed)',
                            marginRight: 5
                        }}>

                        Eredmény elvetése
                    </EpistoButton>

                    <EpistoButton
                        variant='light'
                        onClick={() => {

                            completeExamAsync({
                                answerSessionId: answerSessionId
                            });
                            onExamFinished();
                            dialogLogic.closeDialog();
                        }}
                        style={{
                            flex: 1,
                            marginLeft: 5
                        }}>

                        Befejezem
                    </EpistoButton>
                </Flex>

                <EpistoButton
                    variant='colored'
                    onClick={() => {

                        dialogLogic.closeDialog();
                    }}>

                    Átnézem mégegyszer
                </EpistoButton>


            </Flex>


        </EpistoDialog>

        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                    className="square35" />

                <EpistoFont style={{ marginLeft: '10px' }}>
                    {questions.length}/{questionPaging.currentIndex + 1}
                </EpistoFont>
            </Flex>}
            stepperLogic={{
                ids: questions.map(x => x.questionVersionId),
                currentId: currentQuestion.questionVersionId,
                completedIds: completedQuestionIds,
                selectCurrentHandler: handleSelectCurrent
            }}
            headerCenterText={exam.title}
            headerButtons={new ArrayBuilder()
                .add({
                    title: 'Vizsga befejezése',
                    action: handleOpenDialog
                })
                .getArray()}
            footerButtons={new ArrayBuilder()
                .addIf(hasSelectedAnswer, {
                    title: translatableTexts.exam.nextQuestion,
                    action: handleNextAsync
                })
                .getArray()}>

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
