import { Id } from '@episto/commontypes';

export class CompanyDTO {
    id: Id<'Company'>;
    name: string;
    isSurveyRequired: boolean;
}