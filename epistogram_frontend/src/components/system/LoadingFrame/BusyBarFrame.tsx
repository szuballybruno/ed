import { PropsWithChildren } from '../../../static/frontendHelpers';
import { BusyBar } from './BusyBar';
import { BusyBarContext, useBusyBarContext } from './BusyBarContext';

export const BusyBarFrame = ({ children }: PropsWithChildren) => {

    const state = useBusyBarContext();

    return <BusyBarContext.Provider
        value={state}>

        <BusyBar
            isBusy={state.isBusy} />

        {children}
    </BusyBarContext.Provider>;
};