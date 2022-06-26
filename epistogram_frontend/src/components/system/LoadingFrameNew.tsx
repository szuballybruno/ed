import { Flex, Text } from '@chakra-ui/react';
import { ErrorOutline } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { LoadingLogicType } from '../../services/core/loading';
import { isArray } from '../../static/frontendHelpers';
import { EpistoHeader } from '../EpistoHeader';

export type ErrorType = any | any[];

export type LoadingFramePropsType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: ErrorType,
    onlyRenderIfLoaded?: boolean
};

export const LoadingFrameContext = React.createContext<LoadingLogicType | null>(null);

export const LoadingFrameNew = (props: {
    children: ReactNode
}) => {

    const {
        children
    } = props;

    const [loadingState, setLoadingState] = useState<LoadingStateType | LoadingStateType[]>('idle');
    const [error, setError] = useState<ErrorType>([]);
    const [onlyRenderIfLoaded, setOnlyRenderIfLoaded] = useState<boolean>(false);

    const showOverlay = loadingState === 'error' || loadingState === 'loading';

    const setLoading = useCallback((loadingState: LoadingStateType | LoadingStateType[]) => {

        if (!loadingState)
            return setLoadingState('idle');

        if (loadingState === 'error')
            return setLoadingState('error');

        if (loadingState === 'loading')
            return setLoadingState('loading');

        if (loadingState === 'success')
            return setLoadingState('success');


        if (isArray(loadingState)) {

            const loadingStates = loadingState as LoadingStateType[];

            if (loadingStates.some(x => x === 'error'))
                return setLoadingState('error');

            if (loadingStates.some(x => x === 'loading'))
                return setLoadingState('loading');

            if (loadingStates.all(x => x === 'success'))
                return setLoadingState('success');

            return setLoadingState('idle');
        }
        else {

            return loadingState as LoadingStateType;
        }

    }, [setLoadingState]);


    const getError = useCallback((): ErrorType => {

        if (!error)
            return error;

        if (isArray(error))
            return (error as any[])[0];

        return error;
    }, [error]);

    const singleError = useMemo(() => getError(), [getError]);



    return <LoadingFrameContext.Provider value={{
        loadingState: loadingState,
        setLoading: setLoading
    }}>

        <Flex
            id="loadigFrameRoot"
            position="absolute"
            top='0'>

            {/* overlay */}
            {showOverlay && <Flex
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
                {loadingState === 'error' && <Flex
                    align="center"
                    direction="column">

                    <ErrorOutline style={{ width: '100px', height: '100px' }} />
                    <EpistoHeader text='Az alkalmazás betöltése sikertelen'></EpistoHeader>
                    <Text maxWidth="300px">{singleError?.message}</Text>
                </Flex>}

                {/* loading */}
                {loadingState === 'loading' && <Flex
                    id="loadingDisplayContainer"
                    position='fixed'
                    top='0'
                    width='100%'
                    height='30px'>

                    <LinearProgress
                        style={{
                            color: 'black',
                            height: 3,
                            width: '100%'
                        }} />
                </Flex>}
            </Flex>}
        </Flex>

        {children}
    </LoadingFrameContext.Provider>;

};

