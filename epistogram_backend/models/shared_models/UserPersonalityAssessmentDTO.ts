import { PersonalityDataDTO } from "./PersonalityDataDTO";
import { PersonalityDescriptionsDTO } from "./PersonalityDescriptionsDTO";

export type UserPersonalityAssessmentDTO = {
    chartData: PersonalityDataDTO;
    personalityDescriptions: PersonalityDescriptionsDTO;
}