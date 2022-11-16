import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoCheckboxLabel = ({
    children,
    label,
    boxFirst
}: {
    label: string,
    boxFirst?: boolean
} & PropsWithChildren) => {

    return (
        <EpistoFlex2
            align="center"
            direction='row'
            mx="10px"
            my="2px">

            {boxFirst && children}

            <EpistoFont
                margin={{
                    right: 'px5'
                }}>
                {label}
            </EpistoFont>

            {!boxFirst && children}

        </EpistoFlex2>
    );
};