import { XEventManager } from './XEventManager';

type EventKeys = 'onquery' | 'onAuthHandshake' | 'onActivityGap';

export const eventBus = new XEventManager<EventKeys>();  

export type GlobalEventManagerType = XEventManager<EventKeys>;