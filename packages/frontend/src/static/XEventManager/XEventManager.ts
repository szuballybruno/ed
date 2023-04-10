import { DictionaryOfT } from '../frontendHelpers';
import { Logger } from '../Logger';

export type EventCallbackType<T> = (data: T) => void;
type EventStoreItemType<T> = DictionaryOfT<EventCallbackType<T>>;

export class XEventManager<TEventKey extends string> {

    private _store: DictionaryOfT<EventStoreItemType<any>> = {};

    subscribeEvent<T>(eventKey: TEventKey, subscriberKey: string, callback: EventCallbackType<T>) {

        Logger.logScoped('EVENTS', `Subscribing to event ${eventKey} by ${subscriberKey}`);

        const previousSubscriptions = this
            ._store[eventKey] ?? {};

        /* if (previousSubscriptions[subscriberKey] !== undefined)
            return () => {

            }; *///throw new Error(`Already subscribed by key: ${subscriberKey}`);

        this._store[eventKey] = {
            ...previousSubscriptions,
            [subscriberKey]: callback
        };

        /**
         * Unsubscribe
         */
        return () => {

            delete this
                ._store[eventKey][subscriberKey];
        };
    }

    fireEvent<T>(eventKey: TEventKey, data: T) {

        Logger.logScoped('EVENTS', `Fireing event "${eventKey}", data: `, data);

        const eventSubscriptionObject = this._store[eventKey];
        if (!eventSubscriptionObject) {

            Logger.logScoped('EVENTS', `Event "${eventKey}" has no subscriptions!`);
            return;
        }

        const subscriptions = Object
            .values(eventSubscriptionObject);

        if (subscriptions.length === 0) {

            Logger.logScoped('EVENTS', `Event "${eventKey}" has no callbacks!`);
            return;
        }

        subscriptions
            .forEach(callback => callback(data));
    }
}