import { PersonalityDataDTO } from "./PersonalityDataDTO";
import { PersonalityDescriptionsDTO } from "./PersonalityDescriptionsDTO";

export type PersonalityAssessmentDTO = {
    chartData: PersonalityDataDTO;
    personalityDescriptions: PersonalityDescriptionsDTO;
}