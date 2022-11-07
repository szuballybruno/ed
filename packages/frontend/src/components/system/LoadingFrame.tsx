import { Text } from '@chakra-ui/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { isArray } from '../../static/frontendHelpers';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';
import { EpistoHeader } from '../EpistoHeader';

type ErrorType = any | any[];

export type LoadingFramePropsType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: ErrorType,
    onlyRenderIfLoaded?: boolean
};

export const LoadingFrame = (props: EpistoFlex2Props & LoadingFramePropsType) => {

    const {
        loadingState,
        error,
        onlyRenderIfLoaded,
        ...rootProps
    } = props;

    const [currentLoadingState, setCurrentLoadingState] = useState<LoadingStateType>('idle');
    const showOverlay = currentLoadingState === 'error' || currentLoadingState === 'loading';
    const renderContent = true;//onlyRenderIfLoaded ? !showOverlay : true;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // func
    const cancelTimeout = useCallback(() => {

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    }, []);

    const setNewTimeout = useCallback((fn: () => void) => {

        cancelTimeout();
        timeoutRef.current = setTimeout(fn, 1); // temp set to 1
    }, [cancelTimeout]);

    // error
    const getError = useCallback((): ErrorType => {

        if (!error)
            return error;

        if (isArray(error))
            return (error as any[])[0];

        return error;
    }, [error]);

    const singleError = useMemo(() => getError(), [getError]);

    // state
    const getLoadingState = useCallback((): LoadingStateType => {

        if (singleError)
            return 'error';

        if (!loadingState)
            return 'idle';

        if (isArray(loadingState)) {

            const loadingStates = loadingState as LoadingStateType[];

            if (loadingStates.some(x => x === 'error'))
                return 'error';

            if (loadingStates.some(x => x === 'loading'))
                return 'loading';

            if (loadingStates.some(x => x === 'success'))
                return 'success';

            return 'idle';
        }
        else {

            return loadingState as LoadingStateType;
        }
    }, [loadingState, singleError]);

    const targetLoadingState = useMemo(() => getLoadingState(), [getLoadingState]);

    useEffect(() => {

        if (targetLoadingState !== 'loading') {

            cancelTimeout();
            setCurrentLoadingState(targetLoadingState);
        }
        else {

            setNewTimeout(() => {

                setCurrentLoadingState(targetLoadingState);
            });
        }
    }, [targetLoadingState, setCurrentLoadingState, cancelTimeout, setNewTimeout]);

    useEffect(() => {

        return () => cancelTimeout();
    }, [cancelTimeout]);

    return <EpistoFlex2
        id="loadigFrameRoot"
        position="relative"
        {...rootProps}>

        {/* content */}
        {renderContent && props.children}

        {/* overlay */}
        {showOverlay && <EpistoFlex2
            id="loadingFrameCenterFlex"
            flex="1"
            justify="center"
            align="center"
            overflow="hidden"
            position="fixed"
            zIndex='1000'
            width="100%"
            top="0"
            left="0"
            p="30px">

            {/* error */}
            {currentLoadingState === 'error' && <EpistoFlex2
                align="center"
                direction="column">

                <ErrorOutlineIcon style={{ width: '100px', height: '100px' }}></ErrorOutlineIcon>
                <EpistoHeader text='Az alkalmazás betöltése sikertelen'></EpistoHeader>
                <Text maxWidth="300px">{singleError?.message}</Text>
            </EpistoFlex2>}

            {/* loading */}
            {currentLoadingState === 'loading' && <EpistoFlex2
                id="loadingDisplayContainer"
                position='fixed'
                top='0'
                width='100%'
                height='3px'>

                <EpistoProgressBar
                    style={{
                        color: 'black',
                        height: 3,
                        width: '100%'
                    }} />
            </EpistoFlex2>}
        </EpistoFlex2>}
    </EpistoFlex2>;
};

