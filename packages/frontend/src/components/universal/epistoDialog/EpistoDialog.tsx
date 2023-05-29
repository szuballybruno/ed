import { Close } from '@mui/icons-material';
import { ReactNode } from 'react';
import { ButtonType } from '../../../models/types';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoHeader } from '../../EpistoHeader';
import { XDialog } from '../../lib/XDialog/XDialog';
import { EpistoDialogLogicType } from './EpistoDialogTypes';

export const EpistoDialog = <TParams = any>({
    closeButtonType,
    children,
    logic,
    getButtonComponents,
    fullScreenX,
    fullScreenY,
    ...td
}: {
    closeButtonType?: 'bottom' | 'top',
    logic: EpistoDialogLogicType<TParams>,
    fullScreenX?: boolean,
    fullScreenY?: boolean,
    getButtonComponents?: (params: Partial<TParams>) => ButtonType<any>[],
    children?: ReactNode,
    title?: string | ((params: Partial<TParams>) => string),
    description?: string | ((params: Partial<TParams>) => string)
}) => {

    const paramsNonNullable = (logic.params ?? {}) as Partial<TParams>;

    const buttonComponents = getButtonComponents
        ? getButtonComponents(paramsNonNullable)
        : [];

    const title = typeof td.title === 'function'
        ? td.title(paramsNonNullable)
        : td.title;

    const description = typeof td.description === 'function'
        ? td.description(paramsNonNullable)
        : td.description;

    const dialogButtons = buttonComponents
        .concat(closeButtonType === 'bottom'
            ? [
                {
                    title: 'Bezárás',
                    action: (x: EpistoDialogLogicType<TParams>) => logic.closeDialog()
                }
            ]
            : []);

    return <XDialog
        logic={logic.xlogic}>

        {/* episto dialog root */}
        <EpistoFlex2
            id="episto_dialog_root"
            direction="column"
            width={fullScreenX ? '90%' : undefined}
            height={fullScreenY ? '90%' : undefined}
            overflow="hidden"
            position="relative"
            background="rgba(255,255,255,0.8)"
            backdropFilter="blur(10px)"
            borderRadius="7px"
            minWidth='300px'
            boxShadow="0px 0px 30px 0px rgb(0 0 0 / 20%)">

            {title && <EpistoHeader
                margin="15px"
                text={title} />}

            {closeButtonType === 'top' && <Close
                onClick={logic.closeDialog}
                style={{
                    color: 'black',
                    margin: '15px',
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: 9999,
                    right: 0,
                    top: 0
                }}>
                Bezárás
            </Close>}

            <EpistoFlex2
                id="dialogContentFlex"
                padding={children ? '0px' : '10px'}
                flex="1"
                minHeight="70px">

                {/* simple text content */}
                {description}

                {/* react node contnet */}
                {children}
            </EpistoFlex2>

            {/* buttons */}
            {dialogButtons.length > 0 && <>
                <EpistoFlex2
                    padding="10px"
                    flexDirection="row-reverse">

                    {dialogButtons
                        .map((x, index) => <EpistoButton
                            key={index}
                            variant="plain"
                            onClick={() => {

                                if (x.action)
                                    x.action(logic);

                                logic.closeDialog();
                            }}>
                            {x.title}
                        </EpistoButton>)}
                </EpistoFlex2>
            </>}
        </EpistoFlex2>
    </XDialog>;
};
