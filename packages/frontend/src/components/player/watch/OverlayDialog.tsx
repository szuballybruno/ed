import { ReactNode } from 'react';
import { Responsivity } from '../../../helpers/responsivity';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';

export const OverlayDialog = (props: {
    children: ReactNode,
    showCloseButton?: boolean,
    closeButtonAction?: () => void
}) => {

    const { isMobile } = Responsivity.useIsMobileView();

    return <EpistoDiv
        id="questionnaireDialog"
        bg="white"
        padding="20px"
        maxWidth={isMobile ? '100vw' : undefined}
        maxHeight={isMobile ? '100vh' : undefined}
        borderRadius="20px"
        boxShadow="0 0 20px #0000004a">

        {/* questionnaire */}
        {props.children}

        {/* close button */}
        <EpistoFlex2
            mt="20px"
            justify="flex-end"
            display={props.showCloseButton ? 'flex' : 'none'}>
            <EpistoButton
                variant="outlined"
                onClick={() => {

                    if (props.closeButtonAction)
                        props.closeButtonAction();
                }}>
                Bezárás
            </EpistoButton>
        </EpistoFlex2>
    </EpistoDiv>;
};