import { FeatureDTO } from '@episto/communication';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ApplicationRoute } from '../../models/types';
import { FeatureApiService } from '../../services/api/FeatureApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';

export const useCheckFeatureEnabled = (dto: FeatureDTO) => {

    const { checkFeature, checkFeatureState } = FeatureApiService.useCheckFeature();

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);

    useEffect(() => {

        const handleCheckIfFeatureEnabled = async () => {
            const isEnabled = await checkFeature({
                featureCode: dto.featureCode,
                courseId: dto.courseId
            });

            setIsFeatureEnabled(isEnabled);
        };

        handleCheckIfFeatureEnabled();

    }, [checkFeature, dto.featureCode, dto.courseId]);

    return {
        isFeatureEnabled
    };
};

export const useCheckFeatureOrNavigate = (dto: FeatureDTO, route: ApplicationRoute) => {

    const { checkFeature, checkFeatureState } = FeatureApiService.useCheckFeature();
    const { navigate2 } = useNavigation();

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);

    useEffect(() => {

        const handleCheckIfFeatureEnabled = async () => {
            const isEnabled = await checkFeature({
                featureCode: dto.featureCode
            });

            setIsFeatureEnabled(isEnabled);
        };

        handleCheckIfFeatureEnabled();

        if (!isFeatureEnabled) {

            Logger.logScoped('FEATURE CHECKER', `${dto.featureCode} is disabled. Redirecting to: ${route.name}`);
            navigate2(route);
        }

    }, [checkFeature, dto.featureCode, isFeatureEnabled, navigate2, route]);

    return {
        isFeatureEnabled
    };
};

export const useCheckFeatureByApplicationRoute = (route: ApplicationRoute) => {

    const { checkFeature, checkFeatureState } = FeatureApiService.useCheckFeature();

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);

    useEffect(() => {

        if (!route.featureCode || !route.fallbackRoute)
            return setIsFeatureEnabled(true);

        const handleCheckIfFeatureEnabled = async () => {
            const isEnabled = await checkFeature({
                featureCode: route.featureCode!
            });

            setIsFeatureEnabled(isEnabled);
        };

        handleCheckIfFeatureEnabled();

    }, [checkFeature, route.fallbackRoute, route.featureCode]);

    if (!route.featureCode || !route.fallbackRoute)
        return {
            isFeatureEnabled: true,
            fallbackRoute: route.route
        };

    return {
        isFeatureEnabled,
        fallbackRoute: route.fallbackRoute
    };
};

export const CheckFeatureFrame: FC<PropsWithChildren> = ({ children }) => {

    console.log('Checking feature...');
    const currentRoute = useGetCurrentAppRoute();
    console.log('Current route: ' + currentRoute.route.getAbsolutePath());

    const { isFeatureEnabled, fallbackRoute } = useCheckFeatureByApplicationRoute(currentRoute);

    if (!isFeatureEnabled) {

        console.log('Feature checked, navigating to the fallback route');
        return <Navigate
            replace
            to={fallbackRoute.getAbsolutePath()} />;
    }

    console.log('Feature checked, rendering');
    return <>
        {children}
    </>;
};