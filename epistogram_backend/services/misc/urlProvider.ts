import { staticProvider } from "../../staticProvider";

export const getAssetUrl = (assetPath: string | null | undefined) => {

    if (!assetPath)
        return;

    assetPath = ("/" + assetPath).replace("//", "/");

    return staticProvider.globalConfig.misc.assetStoreUrl + assetPath;
}

export const getExamCoverImageUrl = () => getAssetUrl("/images/examCover.jpg");