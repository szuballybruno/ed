import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Id } from '../../../../shared/types/versionId';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { EpistoSelect, EpistoSelectPropsType } from '../../../controls/EpistoSelect';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';

export type SelectType<T> = { title: string } & EpistoSelectPropsType<T>;

export const AssignAuthItemDialog = (props: {
    children?: ReactNode,
    dialgoLogic: EpistoDialogLogicType,
    userId: Id<'User'>,
    onAdd: () => void,
    selects: SelectType<any>[],
    title: string,
    isAddDisabled: boolean,
    conflictError: string | null
}) => {

    const { children, selects, title, dialgoLogic, isAddDisabled, onAdd, conflictError } = props;

    return (
        <EpistoDialog
            title={title}
            closeButtonType="top"
            logic={dialgoLogic}>

            <Flex
                direction="column"
                width="400px"
                py="50px"
                px="50px">

                {children}

                {/* selects */}
                {selects
                    .map((select, i) => {

                        const { title, ...selectProps } = select;

                        return (
                            <EpistoLabel
                                key={i}
                                text={title}>

                                <EpistoSelect
                                    {...selectProps} />
                            </EpistoLabel>
                        );
                    })}

                {/* conflict warning */}
                {conflictError && <EpistoFont
                    className='fontError'>

                    {conflictError}
                </EpistoFont>}

                {/* add button */}
                <EpistoButton
                    isDisabled={isAddDisabled}
                    variant="colored"
                    onClick={onAdd}>

                    Add
                </EpistoButton>
            </Flex>
        </EpistoDialog>
    );
};