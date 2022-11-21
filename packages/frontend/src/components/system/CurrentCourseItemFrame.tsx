import { createContext, useContext, useMemo } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { useServiceContainerContext } from '../../static/serviceContainer';

const useCurrentCourseItemContextLogic = () => {

    const { miscApiService } = useServiceContainerContext();

    const { currentCourseData, refetchCurrentCourseItemCode } = miscApiService
        .useCurrentCourseItemCode();

    return useMemo(() => ({
        refetchCurrentCourseItemCode,
        currentCourseData
    }), [
        refetchCurrentCourseItemCode,
        currentCourseData
    ]);
};

type CurrentCourseItemContextLogicType = ReturnType<typeof useCurrentCourseItemContextLogic>;

const CurrentCourseItemContext = createContext<CurrentCourseItemContextLogicType>({} as any);

export const useCurrentCourseItemCodeContext = () => useContext(CurrentCourseItemContext);

export const CurrentCourseItemFrame = ({ children }: PropsWithChildren) => {

    const context = useCurrentCourseItemContextLogic();

    return (
        <CurrentCourseItemContext.Provider value={context}>
            {children}
        </CurrentCourseItemContext.Provider>
    );
};