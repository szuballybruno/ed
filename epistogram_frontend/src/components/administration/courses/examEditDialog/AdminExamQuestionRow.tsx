import { Flex } from '@chakra-ui/react';
import { Delete } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { ClassBuilder } from '../../../../helpers/classBuilder';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoEntry } from '../../../controls/EpistoEntry';
import { EditQuestionFnType } from '../videoEditDialog/VideoEditDialog';

export const AdminExamQuestionRow = ({
    rowIndex,
    question,
    columnCount
}: {
    rowIndex: number,
    question: QuestionEditDataDTO,
    columnCount: number
}) => {

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
                    // handleMutateQuestion(question.questionId, 'questionText', questionText);
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
                                // handleMutateQuestion(question.questionId, 'answers', question.answers.map(
                                //     el => el.id === answer.id
                                //         ? { ...el, isCorrect: !answer.isCorrect }
                                //         : el
                                // ));
                            }}
                            style={{
                                color: answer.isCorrect
                                    ? 'var(--deepGreen)'
                                    : 'var(--intenseRed)'
                            }} />

                        <EpistoEntry
                            setValue={(answerText) => {
                                // handleMutateQuestion(question.questionId, 'answers', question.answers.map(
                                //     el => el.id === answer.id
                                //         ? { ...el, text: answerText }
                                //         : el
                                // ));
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