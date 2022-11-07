import { ReactNode, useMemo } from 'react';
import { useForceUpdate } from '../../../static/frontendHelpers';
import { XDialogHosterContext } from './XDialoContext';
import styles from './XDialog.module.css';
import { XDialogHoster } from './XDialogHoster';

export const XDialogHost = (props: {
    children: ReactNode
}) => {

    const { children } = props;
    const forceUpdate = useForceUpdate();
    const xDialogHoster = useMemo(() => new XDialogHoster(forceUpdate), []);

    return <>

        <XDialogHosterContext.Provider
            value={xDialogHoster}>

            <div id="dialog_host_root">
                {xDialogHoster
                    .getDialogItems()
                    .map((poolItem, index) => {

                        return <div
                            key={index}
                            id={poolItem.id}
                            style={{
                                position: 'absolute',
                                width: '100vw',
                                height: '100vh',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000 - index,
                                background: 'rgb(0,0,0,0.3)'
                            }}
                            className={poolItem.isOpen ? styles.disp_flex : styles.disp_none}>

                            {/* click handler */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%'
                                }}
                                onClick={() => xDialogHoster
                                    .closeDialog(poolItem.key)} />
                        </div>;
                    })}
            </div>

            {children}
        </XDialogHosterContext.Provider>
    </>;
};