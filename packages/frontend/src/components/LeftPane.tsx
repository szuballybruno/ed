import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropsWithChildren } from '../static/frontendHelpers';
import { LeftSidebarElementRefContext } from './PageRootContainer';

export const LeftPane = ({
    children,
    collapsed,
    hidden
}: {
    collapsed?: boolean,
    hidden?: boolean
} & PropsWithChildren) => {

    const contextValue = useContext(LeftSidebarElementRefContext);

    useEffect(() => {

        if (!contextValue)
            return;

        contextValue
            .setLeftPaneProps({
                ...contextValue.leftPaneProps,
                isShowing: true,
                isCollapsed: collapsed === true,
                isHidden: hidden === true
            });

        /**
         * Important to destroy properly 
         */
        return () => {

            contextValue
                .setLeftPaneProps({
                    ...contextValue.leftPaneProps,
                    isShowing: false,
                });
        };
    }, [collapsed, contextValue, hidden]);

    if (!contextValue)
        return <></>;

    if (!contextValue.leftPaneElementRef)
        return <></>;

    if (!contextValue.leftPaneElementRef.current)
        return <></>;

    // const LeftPaneComponent = (
    //     <FlexFloat
    //         id="leftPane"
    //         display={hidden ? 'none' : undefined}
    //         borderRadius="none"
    //         bg="white"
    //         zIndex={2}
    //         direction="column"
    //         align="stretch"
    //         padding={'25px 15px 0 15px'}
    //         className="whall dividerBorderRight"
    //         position="relative"
    //         boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)">

    //         {/* logo link */}
    //         {collapsed
    //             ? <EpistoFlex2 width="100%"
    //                 alignItems={'center'}
    //                 justifyContent="center"
    //                 mt="10px"
    //                 mb="20px">
    //                 <img
    //                     src={Environment.getAssetUrl('/images/logo_min.svg')}
    //                     style={{
    //                         height: '50px',
    //                         objectFit: 'cover',
    //                         cursor: 'pointer',
    //                         padding: 0
    //                     }}
    //                     alt=""
    //                     onClick={() => {

    //                         navigate2(applicationRoutes.homeRoute);
    //                     }} />
    //             </EpistoFlex2>
    //             : <EpistoFlex2
    //                 width="100%"
    //                 alignItems={'center'}
    //                 justifyContent="flex-start"
    //                 mb="20px">

    //                 <img
    //                     src={Environment.getAssetUrl('/images/logo.svg')}
    //                     style={{
    //                         height: '50px',
    //                         objectFit: 'cover',
    //                         cursor: 'pointer',
    //                         margin: '10px 10px',
    //                         padding: 0
    //                     }}
    //                     alt=""
    //                     onClick={() => {

    //                         if (hasPermission('BYPASS_SURVEY'))
    //                             navigate2(homeRoute);
    //                     }} />
    //             </EpistoFlex2>}

    //         {children}

    //         {!collapsed && <EpistoImage
    //             position='absolute'
    //             bottom='20px'
    //             left='0'
    //             width='100%'
    //             padding='20px'
    //             src={companyDetails?.logoUrl + ''} />}
    //     </FlexFloat>
    // );

    return createPortal(children, contextValue.leftPaneElementRef.current);
};
