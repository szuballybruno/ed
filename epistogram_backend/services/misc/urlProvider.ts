import { staticProvider } from "../../staticProvider";

export const getAssetUrl = (assetPath: string | null | undefined) => {

    if (!assetPath)
        return null;

    assetPath = ("/" + assetPath).replace("//", "/");

    return staticProvider.globalConfig.fileStorage.assetStoreUrl + assetPath;
}

export const getExamCoverImageUrl = () => getAssetUrl("/images/examCover.jpg");