import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import styles from "./XDialog.module.css";

type ContentPoolItemType = {
    key: string,
    content: ReactNode
}

type XDialogContextType = {
    openDialog: (key: string) => void,
    closeDialog: () => void,
    mountContent: (key: string, content: ReactNode) => void,
    unmountContent: (key: string) => void,
    getOpenState: (key: string) => boolean
};

const XDialogContext = createContext<XDialogContextType>({} as any);

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

    console.log("cp: ")
    console.log(contentPoolRef.current);

    const mountContent = (key: string, content: ReactNode) => {

        console.log(`Mounting dialog content '${key}'`)

        if (contentPoolRef.current.filter(x => x.key === key).length > 0) {

            console.warn("Mounting dialog content with the same key multiple times! " + key);
            return;
        }

        const newItem = { content, key };
        const list = [...contentPoolRef.current, newItem];

        console.log(newItem);
        console.log(list);

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

export const useXDialogLogic = (key: string) => {

    const [isOpen, setIsOpen] = useState(false);

    return {
        key,
        isOpen,
        setIsOpen
    }
}

export type XDialogLogicType = ReturnType<typeof useXDialogLogic>;

export const XDialog = (props: {
    children: ReactNode,
    logic: XDialogLogicType
}) => {

    const { children, logic } = props;

    const {
        mountContent,
        unmountContent,
        getOpenState,
        openDialog,
        closeDialog
    } = useContext(XDialogContext);

    const isReallyOpen = getOpenState(logic.key);

    // mount / unmount from content pool
    useEffect(() => {

        mountContent(logic.key, children);

        return () => {

            unmountContent(logic.key);
        }
    }, []);

    // open close dialog based on logic
    useEffect(() => {

        if (logic.isOpen) {

            openDialog(logic.key);
        }
        else {

            closeDialog();
        }
    }, [logic.isOpen]);

    // sync logic state with global state, 
    // since global state can change by itself 
    useEffect(() => {

        if (logic.isOpen != isReallyOpen)
            logic.setIsOpen(isReallyOpen);
    }, [isReallyOpen]);

    // return something 
    return <></>
}