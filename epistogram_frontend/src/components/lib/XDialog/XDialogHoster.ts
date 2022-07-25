import { Logger } from '../../../static/Logger';

type ContentPoolItemType = {
    key: string;
    id: string;
    isOpen: boolean;
}

export class XDialogHoster {

    static isCreatedAlready: boolean = false;

    private _dialogPool: ContentPoolItemType[] = [];
    private _update: () => void = () => 1;
    private _updateListeners: ({ key: string, fn: () => void })[] = [];

    constructor(update: () => void) {

        this._update = () => {

            Logger.logScoped('DIALOGS', 'Dialog hoster update');

            // update 
            update();

            // call update lisnteners
            this._updateListeners
                .forEach(x => x.fn());
        };

        if (XDialogHoster.isCreatedAlready)
            throw new Error('Trying to create multiple dialog hosters!');

        XDialogHoster.isCreatedAlready = true;
    }

    /**
     * Adds update listener 
     */
    addOnUpdateListener(key: string, fn: () => void) {

        this._updateListeners = [...this._updateListeners, { key, fn }];
    }

    /**
     * Removes an update lisnener 
     */
    removeUpdateListener(key: string) {

        this._updateListeners = this._updateListeners
            .filter(x => x.key !== key);
    }

    /**
     * Get dialog items 
     */
    getDialogItems() {

        return this._dialogPool;
    }

    /**
     * Mount by key 
     */
    mountContent(key: string) {

        Logger.logScoped('DIALOGS', `Mounting dialog content '${key}'`);

        const hasMountedDialog = this
            ._dialogPool
            .some(x => x.key === key);

        if (hasMountedDialog) {

            const msg = 'Mounting dialog content with the same key multiple times! ' + key;
            Logger.logScoped('DIALOGS', msg);
            console.warn(msg);
            return;
        }

        this._setContentPool([...this._dialogPool, {
            key,
            id: this._getId(key),
            isOpen: false
        }]);
    };

    /**
     * Unmount by key 
     */
    unmountContent(key: string) {

        Logger.logScoped('DIALOGS', `Unmounting dialog content '${key}'`);

        const hasMountedDialog = this
            ._dialogPool
            .some(x => x.key === key);

        if (!hasMountedDialog) {

            const msg = 'Unmounting dialog content with a key that does not exist! ' + key;
            Logger.logScoped('DIALOGS', msg);
            console.warn(msg);
            return;
        }

        this._setContentPool(this
            ._dialogPool
            .filter(x => x.key !== key));
    };

    /**
     * Get dialog open state 
     */
    getOpenState(key: string) {

        return this
            ._dialogPool
            .firstOrNull(x => x.key === key)
            ?.isOpen ?? false;
    };

    /**
     * Closes dialog by key 
     */
    closeDialog(key: string) {

        Logger.logScoped('DIALOGS', 'Closing ' + key);
        this._setIsOpen(key, false);
    };

    /**
     * Opens dialog by key 
     */
    openDialog(key: string) {

        Logger.logScoped('DIALOGS', 'Opening ' + key);

        if (!this.getOpenState(key))
            this._setIsOpen(key, true);
    }

    /**
     * Get dialog host element by key 
     */
    getHostElement(key: string): Element {

        const id = this._getId(key);
        return document.getElementById(id) as Element;
    }

    private _setIsOpen(key: string, isOpen: boolean) {

        const index = this
            ._dialogPool
            .findIndex(x => x.key === key);

        this._dialogPool[index].isOpen = isOpen;
        this._update();
    }

    /**
     * Get dialog host element id by key 
     */
    private _getId(key: string) {

        return `dialog_host_${key}`;
    }

    /**
     * Set pool
     */
    private _setContentPool(list: ContentPoolItemType[]) {

        this._dialogPool = list;
        this._update();
    }
};