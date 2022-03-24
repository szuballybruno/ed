import React, { ReactNode, useRef, useState } from "react";
import { XDialogContext } from "./XDialoContext";
import styles from "./XDialog.module.css";

type ContentPoolItemType = {
    key: string,
    content: ReactNode
}
export const XDialogHost = (props: {
    children: ReactNode
}) => {

    const { children } = props;

    const contentPoolRef = useRef<ContentPoolItemType[]>([]);
    const [, setForceUpdate] = useState(0);
    const [currentKey, setCurrentKey] = useState<string | null>(null);

    const setContentPool = (list: ContentPoolItemType[]) => {

        contentPoolRef.current = list;
        setForceUpdate(x => x + 1);
    }

    // console.log("cp: ")
    // console.log(contentPoolRef.current);

    const mountContent = (key: string, content: ReactNode) => {

        console.log(`Mounting dialog content '${key}'`)

        if (contentPoolRef.current.filter(x => x.key === key).length > 0) {

            console.warn("Mounting dialog content with the same key multiple times! " + key);
            return;
        }

        const newItem = { content, key };
        const list = [...contentPoolRef.current, newItem];

        // console.log(newItem);
        // console.log(list);

        setContentPool(list);
    }

    const unmountContent = (key: string) => {

        console.log(`Unmounting dialog content '${key}'`);

        if (contentPoolRef.current.filter(x => x.key === key).length === 0) {

            console.warn("Unmounting dialog content with a key that does not exist! " + key);
            return;
        }

        const filtered = contentPoolRef.current
            .filter(x => x.key !== key);

        setContentPool(filtered);
    }

    const getOpenState = (key: string) => {

        return currentKey === key;
    }

    const closeDialog = () => {

        setCurrentKey(null);
    }

    const handleOutsideClick = () => {

        closeDialog();
    }

    return <>

        <div id="dialog_host_root">
            {contentPoolRef
                .current
                .map(x => {

                    const isVisible = currentKey === x.key;

                    return <div
                        id={`dialog_host_${x.key}`}
                        style={{
                            position: "absolute",
                            width: "100vw",
                            height: "100vh",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 100,
                            backdropFilter: "blur(2px)"
                        }}
                        className={isVisible ? styles.disp_flex : styles.disp_none}>

                        {/* click handler */}
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%"
                            }}
                            onClick={handleOutsideClick} />

                        {/* content */}
                        {x.content}
                    </div>
                })}
        </div>

        <XDialogContext.Provider
            value={{
                closeDialog,
                openDialog: (key: string) => setCurrentKey(key),
                mountContent,
                unmountContent,
                getOpenState
            }}>

            {children}
        </XDialogContext.Provider>
    </>
}