import { createContext, useContext, useMemo } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { useServiceContainerContext } from '../../static/serviceContainer';

const useCurrentCourseItemContextLogic = () => {

    const { miscApiService } = useServiceContainerContext();

    const { currentCourseItemCode, refetchCurrentCourseItemCode } = miscApiService
        .useCurrentCourseItemCode();

    return useMemo(() => ({
        refetchCurrentCourseItemCode,
        currentCourseItemCode
    }), [
        refetchCurrentCourseItemCode,
        currentCourseItemCode
    ]);
};

type CurrentCourseItemContextLogicType = ReturnType<typeof useCurrentCourseItemContextLogic>;

const CurrentCourseItemContext = createContext<CurrentCourseItemContextLogicType>({} as any);

export const useCurrentCourseItemCodeContext = () => useContext(CurrentCourseItemContext);

export const CurrentCourseItemFrame = ({ children }: PropsWithChildren) => {

    const context = useCurrentCourseItemContextLogic();

    console.log(context);

    return (
        <CurrentCourseItemContext.Provider value={context}>
            {children}
        </CurrentCourseItemContext.Provider>
    );
};