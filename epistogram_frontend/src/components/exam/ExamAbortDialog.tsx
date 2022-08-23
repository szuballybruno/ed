import { Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const ExamAbortDialog = ({
    dialogLogic,
    questions,
    answeredQuestionsCount,
    handleExamFinished,
    handleAbortExam
}: {
    dialogLogic: EpistoDialogLogicType,
    questions: QuestionDTO[],
    answeredQuestionsCount: number,
    handleExamFinished: () => void,
    handleAbortExam: () => void
}) => {

    const skippedQuestionsCount = questions.length - answeredQuestionsCount;
    const isCompletedProperly = skippedQuestionsCount === 0;

    const handleCompleteAsync = useCallback(() => {

        handleExamFinished();
        dialogLogic.closeDialog();
    }, [handleExamFinished, dialogLogic]);

    const handleCancel = useCallback(() => {

        dialogLogic.closeDialog();
    }, [dialogLogic]);

    const discardExam = useCallback(() => {

        handleAbortExam();
        dialogLogic.closeDialog();
    }, [handleAbortExam, dialogLogic]);

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

                    {!isCompletedProperly && `Átugrott kérdések száma: ${skippedQuestionsCount} db`}
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
