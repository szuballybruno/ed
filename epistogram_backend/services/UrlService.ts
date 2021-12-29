import { GlobalConfiguration } from "./misc/GlobalConfiguration";

export class UrlService {

    private _config: GlobalConfiguration;

    constructor(globalConfig: GlobalConfiguration) {

        this._config = globalConfig;
    }

    getAssetUrl = (assetPath: string) => {

        assetPath = ("/" + assetPath).replace("//", "/");
        return this._config.fileStorage.assetStoreUrl + assetPath;
    }

    getFrontendUrl = (ending: string) => {

        ending = ("/" + ending).replace("//", "/");
        return this._config.misc.frontendUrl + ending;
    }
}