import { Flex, Checkbox } from '@chakra-ui/react';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoEntry } from '../../../controls/EpistoEntry';

export const AnswerEditItem = ({
    answer,
    onChanged
}: {
    answer: AnswerEditDTO,
    onChanged: (dto: AnswerEditDTO) => void
}) => {

    return (
        <Flex
            align="center">

            {/* answer text */}
            <EpistoEntry
                flex="1"
                setValue={(text) => {

                    onChanged({ ...answer, text });
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

                {/* is correct */}
                <EpistoCheckbox
                    value={answer.isCorrect}
                    setValue={isCorrect => {

                        onChanged({ ...answer, isCorrect: isCorrect });
                    }} />
            </Flex>
        </Flex>
    );
};