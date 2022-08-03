import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { RecreateDBService } from '../services/sqlServices/RecreateDBService';
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { GetServiceProviderType } from '../utilities/XTurboExpress/XTurboExpressTypes';

export const recreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    // override logging scopes to show bootstrap
    serviceProvider
        .getService(GlobalConfiguration)
        .overrideLogScopes(['BOOTSTRAP']);

    //
    // SEED DB
    await serviceProvider
        .getService(RecreateDBService)
        .recreateDBAsync();

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();
};