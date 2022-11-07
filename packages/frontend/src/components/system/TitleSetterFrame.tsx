import { PropsWithChildren, setPageTitle, useGetCurrentAppRoute } from '../../static/frontendHelpers';

export const TitleSetterFrame = (props: PropsWithChildren) => {

    const currentRoute = useGetCurrentAppRoute();

    setPageTitle(currentRoute.title);

    return <>{props.children} </>;
};