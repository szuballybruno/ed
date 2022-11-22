import { Id } from '@episto/commontypes';
import { CompanyDTO } from '@episto/communication';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { LocationHelpers } from '../../../static/locationHelpers';
import { EpistoSelect } from '../../controls/EpistoSelect';

export const useCompanySelectorLogic = ({
    companies
}: {
    companies: CompanyDTO[]
}) => {

    const { administrationRoute } = applicationRoutes;

    const params = LocationHelpers
        .useRouteParams2(administrationRoute);

    const { setRouteParam } = LocationHelpers
        .useSetRouteParam(administrationRoute, 'activeCompanyId');

    const activeCompanyId = params
        .getValue(x => x.activeCompanyId as any, 'int') as any as Id<'Company'>;

    const activeCompany = companies
        .firstOrNull(x => x.id === activeCompanyId);

    const handleSelectCompany = (companyId: Id<'Company'>) => {

        setRouteParam(companyId.toString());
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