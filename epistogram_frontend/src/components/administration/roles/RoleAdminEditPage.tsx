import { Save } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCompanyEditData, useSaveCompany } from '../../../services/api/companiesApiService';
import { showNotification } from '../../../services/core/notifications';
import { usePostCallback } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const RoleAdminEditPage = memo(() => {

    return <div>edit</div>;
});