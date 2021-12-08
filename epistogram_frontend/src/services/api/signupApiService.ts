import { useReactQuery2 } from "../../frontendHelpers";
import { PersonalityAssessmentDTO } from "../../models/shared_models/PersonalityAssessmentDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";

export const usePersonalityData = () => {

    const qr = useReactQuery2<PersonalityAssessmentDTO>(apiRoutes.signup.getUserPersonalityData);

    return {
        personalityData: qr.data,
        personalityDataState: qr.state,
        personalityDataError: qr.error
    };
}