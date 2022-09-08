import { PropsWithChildren } from '../../../static/frontendHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { FullscreenOverlay } from '../../universal/FullscreenOverlay';

export const GlobalErrorOverlay = ({
    children,
    error,
    visible
}: {
    visible: boolean,
    error: any
} & PropsWithChildren) => {


    return (
        <FullscreenOverlay
            visible={visible}
            overlayContent={<EpistoFlex2
                align="center"
                justify="center"
                zIndex="200"
                className="whall">

                <EpistoFlex2
                    p="30px"
                    bg="white">

                    <EpistoFont>
                        {error?.message ?? 'An unknown technical error occured. Try refreshing the page, or coming back later.'}
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>}>

            {children}
        </FullscreenOverlay>
    );
};