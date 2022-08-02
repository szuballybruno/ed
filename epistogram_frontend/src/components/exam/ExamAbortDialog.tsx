import { Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useFinishExam } from '../../services/api/examApiService';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { Id } from '../../shared/types/versionId';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const ExamAbortDialog = ({
    dialogLogic,
    questions,
    answeredQuestionsCount,
    answerSessionId,
    onExamFinished,
    handleAbortExam
}: {
    dialogLogic: EpistoDialogLogicType,
    questions: QuestionDTO[],
    answeredQuestionsCount: number,
    answerSessionId: Id<'AnswerSession'>,
    onExamFinished: () => void,
    handleAbortExam: () => void
}) => {

    const { finishExamAsync: completeExamAsync } = useFinishExam();

    const skippedQuestionsCount = questions.length - answeredQuestionsCount;

    const handleCompleteAsync = useCallback(() => {

        completeExamAsync({ answerSessionId });
        onExamFinished();
        dialogLogic.closeDialog();
    }, [completeExamAsync, onExamFinished, dialogLogic.closeDialog]);

    const handleCancel = useCallback(() => {

        dialogLogic.closeDialog();
    }, [dialogLogic.closeDialog]);

    const discardExam = useCallback(() => {

        handleAbortExam();
        dialogLogic.closeDialog();
    }, [handleAbortExam, dialogLogic.closeDialog]);

    return (
        <EpistoDialog
            closeButtonType='top'
            title='Biztosan befejezed ezt a vizsgát?'
            logic={dialogLogic}>

            <Flex
                direction='column'
                p='20px'>

                <EpistoFont
                    margin={{
                        top: 'px20'
                    }}>
                    {'A \'Befejezem\' gombra való kattintás után már nem módosíthatod a válaszaidat'}
                </EpistoFont>

                <EpistoFont
                    margin={{
                        top: 'px20'
                    }}>
                    Átugrott kérdések száma: {skippedQuestionsCount} db
                </EpistoFont>

                {/* buttons */}
                <Flex
                    my='10px'
                    flex='1'>

                    {/* discard exam */}
                    <EpistoButton
                        variant='light'
                        onClick={discardExam}
                        flex='1'
                        margin={{
                            right: 'px5'
                        }}
                        background='mildRed'>

                        Eredmény elvetése
                    </EpistoButton>

                    {/* complete */}
                    <EpistoButton
                        variant='light'
                        onClick={handleCompleteAsync}
                        margin={{
                            left: 'px5'
                        }}
                        flex='1'>

                        Befejezem
                    </EpistoButton>
                </Flex>

                {/* cancel */}
                <EpistoButton
                    variant='colored'
                    onClick={handleCancel}>

                    Átnézem mégegyszer
                </EpistoButton>

            </Flex>
        </EpistoDialog>
    );
};