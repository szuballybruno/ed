import { EpistoIcons } from '../../../../static/EpistoIcons';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex } from '../../../controls/EpistoFlex';
import { useQuestionEditGridColumns } from './QuestionEditGridColumns';
import { QuestionEditGridLogicType } from './QuestionEditGridLogic';

export const QuestionsEditGrid = ({
    logic
}: {
    logic: QuestionEditGridLogicType
}) => {

    const { getKey, questionRows, handleAddQuestion } = logic;

    const { columns } = useQuestionEditGridColumns(logic);

    return (
        <EpistoFlex
            flex="1"
            direction="vertical">

            {/* heder */}
            <EpistoFlex
                margin={{ all: 'px5' }}
                justify="flex-end">

                <EpistoButton
                    onClick={handleAddQuestion}>

                    <EpistoIcons.Add />
                    Add question
                </EpistoButton>
            </EpistoFlex>

            {/* grid */}
            <EpistoDataGrid
                onFocusChanged={logic.onFocusChanged}
                columns={columns}
                rows={questionRows}
                getKey={getKey} />
        </EpistoFlex>
    );
};