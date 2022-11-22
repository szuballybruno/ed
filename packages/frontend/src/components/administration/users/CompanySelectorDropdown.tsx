import { CompanyDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { LocationHelpers } from '../../../static/locationHelpers';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { useCurrentUserContext } from '../../system/AuthenticationFrame';

export const useCompanySelectorLogic = ({
    companies
}: {
    companies: CompanyDTO[]
}) => {

    const queryParams = LocationHelpers
        .useQueryParams<{ companyId: Id<'Company'> }>();

    const { companyId: currentUserCompanyId } = useCurrentUserContext();

    const { setQueryParams } = LocationHelpers
        .useSetQueryParams<{ companyId: string }>();

    const activeCompanyId = queryParams
        .getValueOrNull(x => x.companyId, 'int') ?? currentUserCompanyId;

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

export type CompanySelectorLogicType = ReturnType<typeof useCompanySelectorLogic>;

export const CompanySelectorDropdown = ({
    logic: {
        companies,
        handleSelectCompany,
        activeCompanyId
    }
}: {
    logic: CompanySelectorLogicType
}) => {

    return <EpistoSelect
        currentKey={activeCompanyId + ''}
        width='180px'
        mr='10px'
        items={companies}
        noUnselected
        onSelected={item => handleSelectCompany(item.id)}
        getCompareKey={item => item.id + ''}
        getDisplayValue={item => item.name} />;
};