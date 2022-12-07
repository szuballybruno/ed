import { PropsWithChildren } from '../../static/frontendHelpers';
import { EpistoFont } from './EpistoFont';

export const EpistoFormLabel = ({ text, children }: { text: string } & PropsWithChildren) => {

    return (
        <>
            <EpistoFont
                isUppercase
                fontSize="fontSmall"
                style={{
                    marginTop: 10,
                    letterSpacing: '1.2px'
                }}>
                {text}
            </EpistoFont>
            {children}
        </>
    );
};