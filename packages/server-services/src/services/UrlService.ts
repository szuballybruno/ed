import { Id } from '@episto/commontypes';
import { DomainProviderService } from './DomainProviderService';
import { GlobalConfigurationService } from './GlobalConfigurationService';

export class UrlService {

    private _config: GlobalConfigurationService;

    constructor(
        globalConfig: GlobalConfigurationService,
        private _domainProviderService: DomainProviderService) {

        this._config = globalConfig;
    }

    getAssetUrl = (assetPath: string) => {

        assetPath = ('/' + assetPath).replace('//', '/');
        return this._config.fileStorage.assetStoreUrl + assetPath;
    };

    getAssetUrlNullable = (assetPath: string | null) => {

        if (!assetPath)
            return null;

        return this.getAssetUrl(assetPath);
    };

    async getFrontendUrl(userId: Id<'User'>, ending: string) {

        const domain = await this
            ._domainProviderService
            .getDomainAsync(userId);

        const endingProcessed = ('/' + ending)
            .replace('//', '/');

        return `${domain}${endingProcessed}`;
    }
}