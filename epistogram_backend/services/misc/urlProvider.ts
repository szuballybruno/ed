import { GlobalConfiguration } from "./GlobalConfiguration";

export class AssetUrlService {

    private _config: GlobalConfiguration;

    constructor(globalConfig: GlobalConfiguration) {

        this._config = globalConfig;
    }

    getAssetUrl = (assetPath: string) => {

        assetPath = ("/" + assetPath).replace("//", "/");
        return this._config.fileStorage.assetStoreUrl + assetPath;
    }
}