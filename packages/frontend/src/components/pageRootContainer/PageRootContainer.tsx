import { ReactNode, useEffect } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { ContentPaneRoot } from './ContentPaneRoot';
import { RootContainerContext, useRootContainerContextValue } from './contentPaneRootLogic';
import { GenericBackground } from './GenericBackground';
import { LeftPaneHost } from './LeftPaneHost';

export const PageRootContainer = ({
    children,
}: {
    children: ReactNode,
}) => {

    useEffect(() => {

        document.title = 'EpistoGram';
    }, []);

    const { isIPhone } = Responsivity
        .useIsIPhone();

    const rootContainerContextValue = useRootContainerContextValue();

    return <EpistoFlex2
        maxH={isIPhone ? '100vh' : undefined}
        maxW={isIPhone ? '100vw' : undefined}
        id="pageRootContainer"
        maxWidth='1920px'
        margin="0 auto"
        position="relative"
        overflow="hidden"
        className="whall">

        {/* background container */}
        <EpistoFlex2
            id="BackgroundContainer"
            ref={rootContainerContextValue.backgroundContainerRef}
            position="absolute"
            top="0"
            zIndex="-1"
            width="100vw"
            height="100vh">

            {!rootContainerContextValue.isBackgroundOverwritten && <GenericBackground />}
        </EpistoFlex2>

        {/* left pane host */}
        <LeftPaneHost
            contextValue={rootContainerContextValue} />

        {/* content host */}
        <RootContainerContext.Provider
            value={rootContainerContextValue}>

            {/* content pane root */}
            <ContentPaneRoot
                contextValue={rootContainerContextValue} >

                {/* render children  */}
                {children}
            </ContentPaneRoot>
        </RootContainerContext.Provider>
    </EpistoFlex2>;
};
