import { PropsWithChildren } from '../../../static/frontendHelpers';
import { BusyBar } from './BusyBar';
import { BusyBarContext, useBusyBarContext } from './BusyBarContext';
import { GlobalErrorOverlay } from './GlobalErrorOverlay';

export const BusyBarFrame = ({ children }: PropsWithChildren) => {

    const state = useBusyBarContext();

    return <BusyBarContext.Provider
        value={state}>

        <BusyBar
            isBusy={state.isBusy} />

        <GlobalErrorOverlay
            error={state.error}
            visible={state.isError}>

            {children}
        </GlobalErrorOverlay>
    </BusyBarContext.Provider>;
};