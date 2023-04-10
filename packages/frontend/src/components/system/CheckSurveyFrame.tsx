import { PropsWithChildren, useEffect, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useNavigation } from '../../services/core/navigatior';

export const CheckSurveyFrame = ({ children }: PropsWithChildren): JSX.Element => {

    const { checkIfSurveySkippable, checkIfSurveySkippableStatus } = SurveyApiService.useCheckIfSurveySkippable();
    const [isSurveySkippable, setIsSurveySkippable] = useState(true);
    const { navigate2 } = useNavigation();
    const { surveyRoute } = applicationRoutes;

    useEffect(() => {

        const handleCheckIfSurveyEnabled = async () => {
            const isSkippable = await checkIfSurveySkippable();

            setIsSurveySkippable(isSkippable);
        };

        handleCheckIfSurveyEnabled();

    }, [checkIfSurveySkippable, surveyRoute]);

    return (
        <>
            {isSurveySkippable
                ? children
                : () => navigate2(surveyRoute)}
        </>
    );

};
