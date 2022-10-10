import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { Id } from '../../../shared/types/versionId';
import { EpistoSelect } from '../../controls/EpistoSelect';

export const CompanySelectorDropdown = ({
    selectedCompanyId,
    handleSelectCompany,
    companies
}: {
    selectedCompanyId: Id<'Company'> | null,
    handleSelectCompany: (companyId: Id<'Company'> | null) => void,
    companies: CompanyDTO[]
}) => {

    const companyItems = [
        {
            id: null,
            name: 'Összes elérhető cég'
        },
        ...companies
    ];

    return <EpistoSelect
        currentKey={selectedCompanyId + ''}
        width='180px'
        mr='10px'
        items={companyItems}
        onSelected={item => handleSelectCompany(item.id)}
        getCompareKey={item => item.id + ''}
        getDisplayValue={item => item.name} />;
};