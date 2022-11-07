import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoCheckboxLabel = ({ children, label }: { label: string } & PropsWithChildren) => {

    return (
        <EpistoFlex2
            align="center"
            direction='row'
            mx="10px"
            my="2px">
            <EpistoFont
                margin={{
                    right: 'px5'
                }}>
                {label}
            </EpistoFont>
            {children}
        </EpistoFlex2>
    );
};