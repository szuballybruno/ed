import { Flex } from '@chakra-ui/react';
import { Add, Timer } from '@mui/icons-material';
import { useState } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { formatTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoFont } from '../../../controls/EpistoFont';
import { AnswerEditItem } from './AnswerEditItem';

export const QuestionEditItem = ({
    question
}: {
    question: QuestionEditDataDTO
}) => {

    const [answers, setAnswers] = useState(question.answers);

    return <Flex
        p="10px"
        // mt={isFirst ? '10px' : '100px'}
        direction="column"
        background="var(--transparentIntenseBlue10)"
        className="roundBorders">

        <Flex align="center"
            justify="space-between"
            mt="15px">

            <EpistoFont
                isUppercase
                fontSize="fontExtraSmall"
                style={{
                    letterSpacing: '1.2px'
                }}>

                Kérdések
            </EpistoFont>

            <Flex>

                <EpistoButton
                    onClick={() => {

                        // setQuestionShowUpTimeSeconds(handleQuestionShowUpTime(question.questionId));
                    }}>

                    <Timer />
                </EpistoButton>
            </Flex>
        </Flex>

        <Flex
            align="flex-start">

            <EpistoEntry
                value={question.questionText}
                // setValue={setQuestionText}
                isMultiline
                flex="12"
                labelVariant="hidden"
                label="Válaszok" />

            <EpistoEntry
                value={formatTime(question.questionShowUpTimeSeconds!)}
                style={{
                    width: 67,
                    fontWeight: 'bold',
                    marginLeft: 10
                }}
                labelVariant="hidden"
                label="Válaszok" />

        </Flex>


        <Flex
            align="center"
            justify="space-between"
            mt="15px">

            <EpistoFont
                isUppercase
                fontSize="fontExtraSmall"
                style={{
                    letterSpacing: '1.2px'
                }}>

                Válaszok
            </EpistoFont>

            {/* answer action buttons */}
            <Flex>

                {/* add answer button */}
                <EpistoButton
                    onClick={() => {

                        const newAnswer: AnswerEditDTO = {
                            answerVersionId: getVirtualId(),
                            text: '',
                            isCorrect: false
                        };

                        setAnswers([...answers, newAnswer]);
                    }}>

                    <Add />
                </EpistoButton>
            </Flex>
        </Flex>

        {/* answers list  */}
        {
            answers
                .map((answer, index) => (

                    <AnswerEditItem
                        key={index}
                        answer={answer}
                        onChanged={(changedAnswer) => {

                            const newAnswers = [...answers];
                            newAnswers[index].isCorrect = changedAnswer.isCorrect;
                            newAnswers[index].text = changedAnswer.text;
                            setAnswers(newAnswers);
                        }} />
                ))
        }
    </Flex >;
};
