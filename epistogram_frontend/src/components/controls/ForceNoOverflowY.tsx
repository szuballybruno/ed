import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFlex2 } from './EpistoFlex';

export const ForceNoOverflowY = (props: PropsWithChildren & {
    disabled?: boolean
}) => {

    return (<>
        {props.disabled
            ? props.children
            : <EpistoFlex2
                id={ForceNoOverflowY.name}
                flex="1"
                width="100%"
                position="relative">

                <EpistoFlex2
                    position='absolute'
                    className="whall"
                    overflow="scroll">

                    {props.children}
                </EpistoFlex2>
            </EpistoFlex2>}
    </>);
};