import { CSSProperties } from "react";
import { ClassBuilder, ClassBuilderCustomizationFnType } from "../../../helpers/classBuilder";
import { TempomatModeType } from "../../../shared/types/sharedTypes";
import { getAssetUrl } from "../../../static/frontendHelpers";

export const TempomatModeImage = (props: {
    mode: TempomatModeType,
    customizeFn?: ClassBuilderCustomizationFnType,
    style?: CSSProperties
}) => {

    const { mode, style, customizeFn } = props;

    const url = (() => {

        if (mode === "auto")
            return getAssetUrl("/images/autopilot.png");

        if (mode === "balanced")
            return getAssetUrl("/images/lightmode.png");

        if (mode === "light")
            return getAssetUrl("/images/balancedmode.png");

        if (mode === "strict")
            return getAssetUrl("/images/strictmode.png");
    })();

    return <img
        src={url}
        style={style}
        className={new ClassBuilder()
            .customize(customizeFn)
            .build()} />
}