import { createContext, useContext } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { useServiceContainerContext } from '../../static/serviceContainer';

const useCurrentCourseItemContextLogic = () => {

    const { miscApiService } = useServiceContainerContext();

    const { currentCourseItemCode, refetchCurrentCourseItemCode } = miscApiService
        .useCurrentCourseItemCode() ?? { currentCourseItemCode: null };

    return {
        refetchCurrentCourseItemCode,
        currentCourseItemCode
    };
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