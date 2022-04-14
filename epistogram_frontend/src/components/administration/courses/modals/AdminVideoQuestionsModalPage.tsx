import { Flex } from '@chakra-ui/react';
import { Add, Remove, Timer } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { formatTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { EditQuestionFnType, QuestionSchema } from '../VideoEditDialog';

const QuestionWithAnswersComponent = (props: {
    isFirst?: boolean,
    question: QuestionSchema,
    handleMutateQuestion: EditQuestionFnType,
    handleQuestionShowUpTime: (key: number) => number
}) => {

    // props
    const {
        isFirst,
        question,
        handleMutateQuestion,
        handleQuestionShowUpTime
    } = props;

    // state
    const [questionText, setQuestionText] = useState('');
    const [questionShowUpTimeSeconds, setQuestionShowUpTimeSeconds] = useState(0);
    const [answers, setAnswers] = useState<AnswerEditDTO[]>([]);

    // effects
    useEffect(() => {
        setQuestionText(question.questionText);
        setQuestionShowUpTimeSeconds(question.questionShowUpTimeSeconds);
        setAnswers(question.answers);
    }, []);

    useEffect(() => {
        handleMutateQuestion(question.questionId, 'questionText', questionText);
    }, [questionText]);

    useEffect(() => {
        handleMutateQuestion(question.questionId, 'answers', answers);
    }, [answers]);

    return <Flex
        p="10px"
        mt={isFirst ? '10px' : '100px'}
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

                        setQuestionShowUpTimeSeconds(handleQuestionShowUpTime(question.questionId));
                    }}>

                    <Timer />
                </EpistoButton>
            </Flex>
        </Flex>

        <Flex
            align="flex-start">

            <EpistoEntry
                value={questionText}
                setValue={setQuestionText}
                isMultiline
                flex="12"
                labelVariant="hidden"
                label="Válaszok" />

            <EpistoEntry
                value={formatTime(questionShowUpTimeSeconds)}
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

            <Flex>

                <EpistoButton onClick={() => {
                    setAnswers(prevState => {
                        const newId = getVirtualId();
                        const a = [...prevState];
                        a.push({
                            id: newId,
                            text: '',
                            isCorrect: false
                        });
                        return a;
                    });
                }}>

                    <Add />
                </EpistoButton>

                <EpistoButton onClick={() => {
                    setAnswers(prevState => {
                        const a = [...prevState];
                        a.pop();
                        return a;
                    });
                }}>

                    <Remove />
                </EpistoButton>
            </Flex>
        </Flex>

        {answers
            .map((answer, index) => {

                return <Flex
                    key={index}
                    align="center">

                    <EpistoEntry
                        flex="1"
                        setValue={(answerText) => {
                            setAnswers(prevState => {
                                return prevState
                                    .map(
                                        el => el.id === answer.id
                                            ? { ...el, text: answerText }
                                            : el
                                    );
                            });
                        }}
                        labelVariant="hidden"
                        label="Válaszok"
                        value={answer.text} />

                    <Flex
                        mt="10px"
                        ml="5px"
                        className="roundBorders"
                        background="var(--transparentWhite70)"
                        align="center"
                        justify="center">

                        <Checkbox
                            checked={answer.isCorrect}
                            onChange={() => {
                                setAnswers(prevState => {
                                    return prevState
                                        .map(
                                            el => el.id === answer.id
                                                ? { ...el, isCorrect: !answer.isCorrect }
                                                : el
                                        );
                                });
                            }}
                            sx={{
                                '.MuiSvgIcon-root': {
                                    width: 22,
                                    height: 22
                                }
                            }}
                            style={{
                                //color: "var(--transparentIntenseBlue85)"
                            }} />
                    </Flex>

                </Flex>;
            })}
    </Flex>;
};

export const AdminVideoQuestionsModalPage = (props: {
    videoUrl: string,
    questions: QuestionSchema[],
    handleAddQuestion: () => void,
    handleMutateQuestion: EditQuestionFnType,
    handleSaveQuestions: () => void,
    isAnyQuestionsMutated: boolean
}) => {

    const {
        videoUrl,
        questions,
        handleAddQuestion,
        handleMutateQuestion,
        handleSaveQuestions,
        isAnyQuestionsMutated
    } = props;

    const [playedSeconds, setPlayedSeconds] = useState(0);

    const handleQuestionShowUpTime = (key: number) => {

        handleMutateQuestion(key, 'questionShowUpTimeSeconds', playedSeconds);
        return playedSeconds;
    };

    return <Flex
        direction="row"
        height="auto"
        flex="1"
        p="20px">

        <Flex
            align="flex-start"
            m="0 5px 30px 0"
            position="sticky"
            maxH="400px"
            top="115"
            flex="1">

            <Flex
                className="mildShadow"
                flex="1">

                <EpistoReactPlayer
                    width="100%"
                    height="calc(56.25 / 100)"
                    controls
                    onProgress={x => setPlayedSeconds(x.playedSeconds)}
                    progressInterval={100}
                    style={{
                        borderRadius: 7,
                        overflow: 'hidden'
                    }}
                    url={videoUrl} />
            </Flex>
        </Flex>

        <Flex
            direction="column"
            flex="1"
            mt="5px"
            p="0 20px 100px 20px">


            {questions
                .map((question, index) => {

                    return <QuestionWithAnswersComponent
                        key={question.questionId}
                        question={question}
                        handleMutateQuestion={handleMutateQuestion}
                        handleQuestionShowUpTime={handleQuestionShowUpTime}
                        isFirst />;
                })}

            <EpistoButton
                variant="outlined"
                onClick={() => handleAddQuestion()}
                style={{
                    margin: '10px 0',
                    borderColor: 'var(--epistoTeal)',
                    color: 'var(--epistoTeal)'
                }}>

                <Add />
            </EpistoButton>
        </Flex>

        <EpistoButton
            isDisabled={!isAnyQuestionsMutated}
            onClick={handleSaveQuestions}
            variant="colored"
            style={{
                position: 'absolute',
                bottom: 20,
                width: 'calc(100% - 40px)'
            }}>

            Mentés
        </EpistoButton>
    </Flex >;
};
