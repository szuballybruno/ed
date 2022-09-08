import { Save } from '@mui/icons-material';
import { memo, useCallback, useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompanyEditData, useSaveCompany } from '../../../services/api/companyApiService';
import { showNotification } from '../../../services/core/notifications';
import { CompanyEditDataDTO } from '../../../shared/dtos/company/CompanyEditDataDTO';
import { usePostCallback, useStateObject } from '../../../static/frontendHelpers';
import { useRouteParams } from '../../../static/locationHelpers';
import { EpistoColorPicker } from '../../controls/EpistoColorPicker';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { useSetBusy } from '../../system/LoadingFrame/BusyBarContext';
import { EpistoImageSelector } from '../../universal/EpistoImageSelector';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

type CompanyAdminEditPagePropsType = { onNameLoaded: (name: string) => void };

export const CompanyAdminEditPage = memo(({ onNameLoaded }: CompanyAdminEditPagePropsType) => {

    const { editRoute } = applicationRoutes.administrationRoute.companiesRoute;

    const companyId = useRouteParams(editRoute)
        .getValue(x => x.companyId, 'int');

    const [{
        name,
        legalName,
        domain,
        backdropColor,
        coverUrl,
        logoUrl,
        primaryColor,
        secondaryColor,
        logoFile,
        coverFile,
    }, setState] = useStateObject({
        ...{
            name: '',
            legalName: '',
            domain: '',
            coverUrl: '',
            logoUrl: '',
            secondaryColor: '',
            primaryColor: '',
            backdropColor: ''
        } as CompanyEditDataDTO,
        ...{
            logoFile: null as File | null,
            coverFile: null as File | null
        }
    });

    // http
    const { companyEditData, companyEditDataState } = useCompanyEditData(companyId);
    const { saveCompanyAsync, saveCompanyState } = useSaveCompany();

    useSetBusy(useCompanyEditData, companyEditDataState);

    const saveCompanyAsyncWithData = useCallback(() => saveCompanyAsync({
        id: companyId,
        name,
        backdropColor,
        domain,
        isCustomDomainCompany: false,
        legalName,
        coverUrl: '',
        logoUrl: '',
        primaryColor,
        secondaryColor,
        logoFile,
        coverFile
    }), [
        saveCompanyAsync,
        companyId,
        name,
        backdropColor,
        domain,
        legalName,
        primaryColor,
        secondaryColor,
        logoFile,
        coverFile
    ]);

    const handleSaveCompanyAsync = usePostCallback(saveCompanyAsyncWithData, [() => showNotification('Sikeresen mentve!')]);

    /**
     * set state from loaded data
     */
    useEffect(() => {

        if (!companyEditData)
            return;

        onNameLoaded(companyEditData.name);
        setState(companyEditData);
    }, [companyEditData, onNameLoaded, setState]);

    return <>

        <AdminSubpageHeader
            direction="column"
            pb="20px"
            tabMenuItems={[
                applicationRoutes.administrationRoute.companiesRoute.indexRoute,
                editRoute
            ]}
            headerButtons={[
                {
                    title: 'Save',
                    icon: <Save></Save>,
                    action: handleSaveCompanyAsync
                }
            ]}>

            <EpistoEntry
                label="Short name"
                value={name}
                setValue={x => setState(state => state.name = x)} />

            <EpistoEntry
                label="Legal name"
                value={legalName}
                setValue={x => setState(state => state.legalName = x)} />

            <EpistoEntry
                label="Domain"
                value={domain}
                setValue={x => setState(state => state.domain = x)} />

            <EpistoColorPicker
                width="200px"
                color={backdropColor}
                text='Backdrop'
                setColor={color => setState(state => state.backdropColor = color)} />

            <EpistoColorPicker
                width="200px"
                color={primaryColor}
                text='Primary'
                setColor={color => setState(state => state.primaryColor = color)} />

            <EpistoColorPicker
                width="200px"
                color={secondaryColor}
                text='Secondary'
                setColor={color => setState(state => state.secondaryColor = color)} />

            <EpistoImageSelector
                width="200px"
                height="120px"
                border="1px solid var(--mildGrey)"
                setImageFile={file => setState(x => x.logoFile = file)}
                setImageSource={src => setState(x => x.logoUrl = src)}
                src={logoUrl ?? ''} />

            <EpistoImageSelector
                width="200px"
                height="120px"
                border="1px solid var(--mildGrey)"
                setImageFile={file => setState(x => x.coverFile = file)}
                setImageSource={src => setState(x => x.coverUrl = src)}
                src={coverUrl ?? ''} />
        </AdminSubpageHeader>
    </>;
}, (oldProps, newProps) => oldProps.onNameLoaded === newProps.onNameLoaded);