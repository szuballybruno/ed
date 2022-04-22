import { Flex } from '@chakra-ui/react';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';

export const AddRoleDialog = (props: { logic: EpistoDialogLogicType }) => {

    const { logic } = props;

    return <>
        <EpistoDialog logic={logic}>
            <Flex
                width='300px'
                height='500px'>

                asd

            </Flex>
        </EpistoDialog>
    </>;
};