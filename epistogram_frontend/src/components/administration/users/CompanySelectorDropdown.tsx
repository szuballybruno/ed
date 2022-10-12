import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { Id } from '../../../shared/types/versionId';
import { LocationHelpers } from '../../../static/locationHelpers';
import { EpistoSelect } from '../../controls/EpistoSelect';

export const useCompanySelectorDropdownLogic = ({
    companies
}: {
    companies: CompanyDTO[]
}) => {

    const queryParams = LocationHelpers
        .useQueryParams<{ companyId: Id<'Company'> }>();

    const { setQueryParams } = LocationHelpers
        .useSetQueryParams<{ companyId: string }>();

    const activeCompanyId = queryParams
        .getValueOrNull(x => x.companyId, 'int');

    const activeCompany = companies
        .firstOrNull(x => x.id === activeCompanyId);

    const handleSelectCompany = (companyId: Id<'Company'> | null) => {

        const queryValue = companyId === -1 as any ? null : companyId + '';
        setQueryParams('companyId', queryValue);
    };

    return {
        activeCompanyId,
        handleSelectCompany,
        companies,
        activeCompany
    };
};

export type CompanySelectorDropdownLogicType = ReturnType<typeof useCompanySelectorDropdownLogic>;

export const CompanySelectorDropdown = ({
    logic: {
        companies,
        handleSelectCompany,
        activeCompanyId
    }
}: {
    logic: CompanySelectorDropdownLogicType
}) => {

    const companyItems: CompanyDTO[] = [
        {
            id: -1 as any,
            name: 'Összes elérhető cég',
            isSurveyRequired: true
        },
        ...companies
    ];

    return <EpistoSelect
        currentKey={activeCompanyId + ''}
        width='180px'
        mr='10px'
        items={companyItems}
        onSelected={item => handleSelectCompany(item.id)}
        getCompareKey={item => item.id + ''}
        getDisplayValue={item => item.name} />;
};