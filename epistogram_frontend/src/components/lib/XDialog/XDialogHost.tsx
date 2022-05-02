import React, { ReactNode, useRef, useState } from 'react';
import { XDialogContext } from './XDialoContext';
import styles from './XDialog.module.css';

type ContentPoolItemType = {
    key: string
}

const debug = false;

export const XDialogHost = (props: {
    children: ReactNode
}) => {

    const { children } = props;

    const contentPoolRef = useRef<ContentPoolItemType[]>([]);
    const [, setForceUpdate] = useState(0);
    const [openDialogKeys, setOpenDialogKeys] = useState<string[]>([]);

    const setContentPool = (list: ContentPoolItemType[]) => {

        contentPoolRef.current = list;
        setForceUpdate(x => x + 1);
    };

    const mountContent = (key: string) => {

        if (debug)
            console.log(`Mounting dialog content '${key}'`);

        if (contentPoolRef.current.filter(x => x.key === key).length > 0) {

            console.warn('Mounting dialog content with the same key multiple times! ' + key);
            return;
        }

        const newItem = { key };
        const list = [...contentPoolRef.current, newItem];


        setContentPool(list);
    };

    const unmountContent = (key: string) => {

        if (debug)
            console.log(`Unmounting dialog content '${key}'`);

        if (contentPoolRef.current.filter(x => x.key === key).length === 0) {

            console.warn('Unmounting dialog content with a key that does not exist! ' + key);
            return;
        }

        const filtered = contentPoolRef.current
            .filter(x => x.key !== key);

        setContentPool(filtered);
    };

    const getOpenState = (key: string) => {

        return openDialogKeys.any(x => x === key);
    };

    const closeDialog = (key: string) => {

        setOpenDialogKeys(openDialogKeys.filter(x => x !== key));
    };

    const openDialog = (key: string) => {

        if (!getOpenState(key))
            setOpenDialogKeys([...openDialogKeys, key]);
    };

    const getId = (key: string) => {

        return `dialog_host_${key}`;
    };

    const getHostElement = (key: string): Element => {

        return document.getElementById(getId(key)) as Element;
    };

    return <>

        <XDialogContext.Provider
            value={{
                closeDialog,
                openDialog,
                mountContent,
                unmountContent,
                getOpenState,
                getHostElement
            }}>

            <div id="dialog_host_root">
                {contentPoolRef
                    .current
                    .map((poolItem, index) => {

                        const isOpen = getOpenState(poolItem.key);

                        return <div
                            key={index}
                            id={getId(poolItem.key)}
                            style={{
                                position: 'absolute',
                                width: '100vw',
                                height: '100vh',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000 - index,
                                background: '#0000000d'
                            }}
                            className={isOpen ? styles.disp_flex : styles.disp_none}>

                            {/* click handler */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%'
                                }}
                                onClick={() => closeDialog(poolItem.key)} />
                        </div>;
                    })}
            </div>

            {children}
        </XDialogContext.Provider>
    </>;
};