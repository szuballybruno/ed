import { useEffect } from 'react';
import { Logger } from '../Logger';
import { XEventManager } from './XEventManager';

const useSubscribeEvent = <T extends string,>(eventManager: XEventManager<T>, key: T, tag: string, fn: (...params) => void) => {

    useEffect(() => {

        Logger.logScoped('EVENTS', `Subscribing in useEffect: ${key} - ${tag}.`);

        const unsubscribe = eventManager
            .scubscribeEvent(key, tag, fn);

        return () => {

            Logger.logScoped('EVENTS', `Unsubscribing in useEffect cleanup: ${key} - ${tag}.`);
            unsubscribe();
        };
    }, [eventManager, key, tag, fn]);
};

export const XEventManagerReact = {
    useSubscribeEvent
};