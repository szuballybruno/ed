import { staticProvider } from "../../staticProvider";

export const getAssetUrl = (assetPath: string) => {

    assetPath = ("/" + assetPath).replace("//", "/");
    return staticProvider.globalConfig.fileStorage.assetStoreUrl + assetPath;
}

export const getExamCoverImageUrl = () => getAssetUrl("/images/examCover.jpg");