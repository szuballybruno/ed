import { DictionaryOfT } from './frontendHelpers';
import { Logger } from './Logger';

export type EventCallbackType<T> = (data: T) => void;
type EventStoreItemType<T> = DictionaryOfT<EventCallbackType<T>>;

export class XEventManager<TEventKey extends string> {

    private _store: DictionaryOfT<EventStoreItemType<any>> = {};

    scubscribeEvent<T>(eventKey: TEventKey, subscriberKey: string, callback: EventCallbackType<T>) {

        Logger.logScoped('EVENT BUS', `Subscribing to event ${eventKey} by ${subscriberKey}`);

        this._store[eventKey] = {
            ...(this._store[eventKey] ?? {}),
            [subscriberKey]: callback
        };
    }

    fireEvent<T>(eventKey: TEventKey, data: T) {

        Logger.logScoped('EVENT BUS', `Fireing event "${eventKey}", data: `, data);

        const storeSlot = this._store[eventKey];
        if (!storeSlot)
            return;

        Object
            .values(storeSlot)
            .forEach(callback => callback(data));
    }
}